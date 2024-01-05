import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Form, message } from "antd";
import { classesStateEnum } from "@/constants/index.js";
import {
  classesListData,
  majorListData,
  teacherListData,
} from "@/services/manager.js";
import { getTwoYearArray } from "@/utils/tools.js";
import { classesInsertOrUpdateApi } from "@/apis/index.js";

const EditFormModal = (props) => {
  const [form] = Form.useForm();
  const formRef = useRef();

  const onSubmitFormData = async (values) => {
    await classesInsertOrUpdateApi(values);
    message.success("提交成功");
  };

  return (
    <ModalForm
      title="新建"
      open={props.visible}
      form={form}
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
      onFinish={async (values) => {
        console.log(values);
        // message.success("提交成功");
        await onSubmitFormData(values);
        props.onCancel();
        props.onOk();
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          request={classesListData}
          name="collegeId"
          label="院校名称"
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
        <ProFormText
          colProps={{ xl: 14 }}
          name="className"
          label="班级名称"
          placeholder="请输入班级名称"
          rules={[{ required: true, message: "请输入班级名称!" }]}
        />
        <ProFormSelect
          colProps={{ xl: 10 }}
          request={teacherListData}
          name="headmasterId"
          label="班主任"
          rules={[{ required: true, message: "请选择班主任!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 10 }}
          valueEnum={getTwoYearArray(1950)}
          name="grade"
          label="年级"
          rules={[{ required: true, message: "请选择年级!" }]}
        />
        <ProFormSelect.SearchSelect
          width="md"
          colProps={{ xl: 14 }}
          request={teacherListData}
          name="headmasterId1"
          label="任课老师"
          rules={[{ required: true, message: "请选择任课老师!" }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          valueType="select"
          fieldProps={{ options: classesStateEnum }}
          name="state"
          label="状态"
          rules={[{ required: true, message: "请选择状态!" }]}
          // transform={(value) => {
          //   return {
          //     state: +value,
          //   };
          // }}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default EditFormModal;
