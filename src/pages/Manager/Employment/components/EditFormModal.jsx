import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
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
  teacherListData,
} from "@/services/manager.js";
import { activityInsertOrUpdateApi, classesDetailApi } from "@/apis/index.js";
import { debounce } from "@/utils/tools.js";
import { activityStateEnum } from "@/constants/index.js";
import { baseUrl } from "@/utils/request.js";

export default function EditFormModal(props) {
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
    await activityInsertOrUpdateApi({
      ...values,
      id: props.info.id,
      type: 3,
      recruitmentBrochure:
        values.recruitmentBrochure.length &&
        values.recruitmentBrochure.map((item) => item.response.data).join(),
    });
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
          colProps={{ xl: 24 }}
          name="activityName"
          label="名称"
          placeholder="请输入名称"
          rules={[{ required: true, message: "请输入名称!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 24 }}
          name="enterprisesName"
          label="企业名称"
          placeholder="请输入企业名称"
          rules={[{ required: true, message: "请输入企业名称!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          colProps={{ xl: 24 }}
          name="content"
          label="企业说明"
          placeholder="请输入企业说明"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          colProps={{ xl: 24 }}
          name="resourceAllocation"
          label="岗位介绍"
          placeholder="请输入岗位介绍"
          rules={[{ required: true, message: "请输入岗位介绍!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormUploadButton
          label="招聘简章"
          name="recruitmentBrochure"
          max={9}
          action={baseUrl + "/common/fileUpload"}
          rules={[{ required: true, message: "请上传招聘简章!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          request={teacherListData}
          name="teacherId"
          label="指导教师"
          showSearch
          rules={[{ required: true, message: "请选择指导教师!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          name="studentNum"
          label="招聘人数"
          colProps={{ xl: 24 }}
          placeholder="请输入招聘人数"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          request={classesListData}
          name="collegeId"
          label="学生范围-院校"
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
          label="学生范围-专业"
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
          label="学生范围-班级"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          valueType="select"
          fieldProps={{ options: activityStateEnum }}
          name="state"
          label="状态"
          rules={[{ required: true, message: "请选择状态!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          colProps={{ xl: 24 }}
          name="remarks"
          label="备注"
          placeholder="请输入备注"
        />
      </ProForm.Group>
    </ModalForm>
  );
}
