import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormDateRangePicker,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTimePicker,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useRef } from "react";
import { teacherListData } from "@/services/manager.js";
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
          label="实训名称"
          placeholder="请输入实训名称"
          rules={[{ required: true, message: "请输入实训名称!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 24 }}
          name="enterprisesName"
          label="合作企业"
          placeholder="请输入合作企业"
          rules={[{ required: true, message: "请输入合作企业!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          colProps={{ xl: 24 }}
          name="content"
          label="实训内容"
          placeholder="请输入实训内容"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 24 }}
          name="address"
          label="实训地点"
          placeholder="请输入实训地点"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 24 }}
          name="resourceAllocation"
          label="资源配置"
          placeholder="请输入资源配置"
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
      <ProFormFieldSet name="list" label="人才需求：">
        <ProCard bordered>
          <ProForm.Group>
            <ProFormDateRangePicker
              name="attendanceStartEndDate"
              label=""
              transform={(value) => {
                const [startTime, endTime] = value;
                return {
                  startTime: dayjs(startTime).format("YYYY-MM-DD HH:mm:ss"),
                  endTime: dayjs(endTime).format("YYYY-MM-DD HH:mm:ss"),
                };
              }}
            />
          </ProForm.Group>
          <ProForm.Group
            style={{
              marginBlock: 8,
            }}
          >
            <ProFormSelect.SearchSelect
              valueType="select"
              fieldProps={{ options: attendancePeriodEnum }}
              showSearch
              name="attendancePeriodList"
              placeholder="请选择出勤周期"
              label=""
              transform={(value) => {
                return {
                  attendancePeriod: value.map((item) => item.value).join(),
                };
              }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormTimePicker.RangePicker
              name="attendanceStartEndTime"
              label=""
              format="HH:mm"
              transform={(value) => {
                return {
                  attendanceTime: value.join("-"),
                };
              }}
            />
          </ProForm.Group>
        </ProCard>
      </ProFormFieldSet>

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
