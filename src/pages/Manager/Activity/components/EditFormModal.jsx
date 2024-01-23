import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTimePicker,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useRef } from "react";
import {
  classesListData,
  classesListDataByMajor,
  majorListData,
  teacherListData,
} from "@/services/manager.js";
import {
  classesDetailApi,
  trainingActivityInsertOrUpdateApi,
} from "@/apis/index.js";
import { debounce } from "@/utils/tools.js";
import { activityStateEnum, attendancePeriodEnum } from "@/constants/index.js";
import dayjs from "dayjs";

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
    // console.log("values>>>>>>>>>", values);
    await trainingActivityInsertOrUpdateApi({
      ...values,
      id: props.info.id,
      type: 1,
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
          label="活动名称"
          placeholder="请输入活动名称"
          rules={[{ required: true, message: "请输入活动名称!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 24 }}
          name="enterprisesName"
          label="活动主题"
          placeholder="请输入活动主题"
          rules={[{ required: true, message: "请输入活动主题!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          valueType="select"
          fieldProps={{
            options: [
              {
                label: "技能大赛",
                value: 1,
              },
              {
                label: "其他",
                value: 2,
              },
            ],
          }}
          name="state"
          label="活动类型"
          rules={[{ required: true, message: "请选择活动类型!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDateRangePicker
          name="attendanceStartEndDate"
          label="活动时间"
          rules={[{ required: true, message: "请选择活动时间!" }]}
          transform={(value) => {
            const [startTime, endTime] = value;
            return {
              startTime: dayjs(startTime).format("YYYY-MM-DD HH:mm:ss"),
              endTime: dayjs(endTime).format("YYYY-MM-DD HH:mm:ss"),
            };
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 24 }}
          name="address"
          label="活动地点"
          placeholder="请输入活动地点"
        />
      </ProForm.Group>{" "}
      <ProForm.Group>
        <ProFormTextArea
          colProps={{ xl: 24 }}
          name="content"
          label="活动内容"
          placeholder="请输入活动内容"
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
          name="totalClassHours"
          label="学生人数"
          colProps={{ xl: 24 }}
          placeholder="请输入学生人数"
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
          fieldProps={{
            options: [
              {
                label: "学生自主报名",
                value: 1,
              },
              {
                label: "指定学生",
                value: 2,
              },
            ],
          }}
          name="state"
          label="参与方式"
          rules={[{ required: true, message: "请选择参与方式!" }]}
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
