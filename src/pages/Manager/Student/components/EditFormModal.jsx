import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useRef } from "react";
import {
  classesListData,
  classesListDataByMajor,
  majorListData,
} from "@/services/manager.js";
import {
  classesDetailApi,
  studentInsertOrUpdateApi,
  studentWorkExperienceInsertOrUpdateApi,
} from "@/apis/index.js";
import { debounce } from "@/utils/tools.js";
import { baseUrl } from "@/utils/request.js";
import { classesStateEnum, genderEnum, nationEnum } from "@/constants/index.js";

export default function EditFormModal(props) {
  console.log(">>>>>>>>>>>>>", props);
  const formRef = useRef();

  const classesInfoDataById = async ({ id }) => {
    const { data } = await classesDetailApi({
      id,
    });

    formRef.current?.setFieldsValue({
      grade: data.grade,
    });
  };

  const onSubmitFormData = async (values) => {
    const { data } = await studentInsertOrUpdateApi({
      ...values,
      id: props.info.id,
      studentWorkExperienceList: undefined,
    });
    if (Array.isArray(values.studentWorkExperienceList)) {
      for (let i = 0; i < values.studentWorkExperienceList.length; i++) {
        const item = values.studentWorkExperienceList[i];
        await studentWorkExperienceInsertOrUpdateApi({
          ...item,
          studentId: data,
        });
      }
    }

    message.success("提交成功");
  };

  return (
    <ModalForm
      title={props.info.id ? "编辑" : "新建"}
      open={props.visible}
      formRef={formRef}
      layout="inline"
      grid={true}
      rowProps={{
        gutter: [16, 24],
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => props.onCancel(),
      }}
      initialValues={props.info}
      submitTimeout={2000}
      onFinish={debounce(async function (values) {
        await onSubmitFormData(values);
        props.onCancel();
        props.onOk();
        return true;
      })}
      onValuesChange={({ classId }) => {
        if (classId) classesInfoDataById({ id: classId });
        else
          formRef.current?.setFieldsValue({
            grade: undefined,
          });
      }}
    >
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 14 }}
          name="studentName"
          label="学生姓名"
          placeholder="请输入学生姓名"
          rules={[{ required: true, message: "请输入学生姓名!" }]}
        />
        <ProFormText
          colProps={{ xl: 10 }}
          name="tel"
          label="学生电话"
          placeholder="请输入学生电话"
          rules={[{ required: true, message: "请输入学生电话!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormUploadButton
          label="学生照片"
          name="photo"
          max={1}
          action={baseUrl + "/common/fileUpload"}
          extra="支持扩展名：.jpg .png .jpeg"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 14 }}
          valueType="select"
          fieldProps={{ options: genderEnum }}
          name="gender"
          label="性别"
          placeholder="请选择性别"
          rules={[{ required: true, message: "请选择性别!" }]}
        />

        <ProFormDatePicker
          colProps={{ xl: 10 }}
          name="birthday"
          label="出生年月"
          placeholder="请选择出生年月"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 14 }}
          name="vision"
          label="视力"
          placeholder="请输入视力"
        />
        <ProFormText
          colProps={{ xl: 10 }}
          name="height"
          label="身高(CM)"
          placeholder="请输入身高(CM)"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 14 }}
          name="weight"
          label="体重(KG)"
          placeholder="请输入体重(KG)"
        />

        <ProFormSelect
          colProps={{ xl: 10 }}
          valueType="select"
          fieldProps={{ options: nationEnum }}
          name="nation"
          label="民族"
          showSearch={true}
          placeholder="请选择民族"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          request={classesListData}
          name="collegeId"
          label="院校"
          rules={[{ required: true, message: "请选择院校!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          dependencies={["collegeId"]}
          request={async (params) => {
            const { collegeId } = params;
            formRef.current?.setFieldsValue({
              majorId: undefined,
            });
            if (!collegeId) return [];

            return majorListData(collegeId);
          }}
          name="majorId"
          label="专业"
          rules={[{ required: true, message: "请选择专业!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          dependencies={["collegeId", "majorId"]}
          request={async (params) => {
            const { collegeId, majorId } = params;

            if (!collegeId || !majorId) {
              formRef.current?.setFieldsValue({
                classId: undefined,
              });
              return [];
            }
            return classesListDataByMajor(collegeId, majorId);
          }}
          name="classId"
          label="班级"
          rules={[{ required: true, message: "请选择班级!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText colProps={{ xl: 14 }} label="年级" name="grade" readonly />
        <ProFormText
          colProps={{ xl: 10 }}
          name="nativePlace"
          label="籍贯"
          placeholder="请输入籍贯"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 24 }}
          name="skills"
          label="职业技能"
          placeholder="请输入职业技能"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          valueType="select"
          fieldProps={{
            options: [
              ...classesStateEnum,
              {
                label: "未完成学业",
                value: 3,
              },
            ],
          }}
          name="state"
          label="毕业就业情况"
          placeholder="请选择毕业就业情况"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormList
          name="studentWorkExperienceList"
          label="就业经历"
          creatorButtonProps={{
            creatorButtonText: "添加就业经历",
          }}
          min={1}
          copyIconProps={false}
          itemRender={({ listDom, action }, { index }) => (
            <ProCard
              bordered
              style={{ marginBlockEnd: 8 }}
              title={`就业经历${index + 1}`}
              extra={action}
              bodyStyle={{ paddingBlockEnd: 0 }}
            >
              {listDom}
            </ProCard>
          )}
          // creatorRecord={{ name: "", items: [{ name: "" }] }}
          // initialValue={props.info.studentWorkExperienceList}
        >
          <ProForm.Group>
            <ProFormText
              colProps={{ span: 24 }}
              name="enterprisesName"
              placeholder="就业企业"
            />
          </ProForm.Group>
          <ProForm.Group
            style={{
              marginBlock: 8,
            }}
          >
            <ProFormText
              colProps={{ span: 10 }}
              name="salary"
              placeholder="薪资"
            />
            <ProFormDatePicker
              colProps={{ xl: 10 }}
              name="entryTime"
              label="入职时间"
              placeholder="请选择入职时间"
            />
          </ProForm.Group>
        </ProFormList>
      </ProForm.Group>

      <ProForm.Group>
        <ProFormTextArea
          colProps={{ span: 24 }}
          name="familyInfo"
          label="家庭信息"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          colProps={{ span: 24 }}
          name="selfIntroduction"
          label="自我介绍"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormUploadButton
          label="自我介绍附件"
          name="enclosure"
          max={9}
          action={baseUrl + "/common/fileUpload"}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText colProps={{ span: 24 }} name="payment" label="缴费情况" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea colProps={{ span: 24 }} name="remarks" label="备注" />
      </ProForm.Group>
    </ModalForm>
  );
}
