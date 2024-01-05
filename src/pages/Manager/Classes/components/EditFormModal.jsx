import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { collegeListApi, majorListApi, teacherListApi } from "@/apis/index.js";
import { classesStateEnum } from "@/constants/index.js";

const EditFormModal = (props) => {
  const [form] = Form.useForm();
  const formRef = useRef();
  return (
    <ModalForm
      // width={window.innerWidth * 0.3}
      width={800}
      title="新建"
      open={props.visible}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建表单
        </Button>
      }
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
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values);
        message.success("提交成功");
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          request={async () => {
            const { data } = await collegeListApi({
              pageNum: 1,
              pageSize: 400,
            });
            return data.list.map((item) => ({
              ...item,
              label: item.collegeName,
              value: item.id,
            }));
          }}
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
            if (!collegeId) return [];
            formRef.current?.setFieldsValue({
              majorId: undefined,
            });
            const { data } = await majorListApi({ collegeId });
            return data.list.map((item) => ({
              ...item,
              label: item.major,
              value: item.id,
            }));
          }}
          name="majorId"
          label="专业"
          rules={[{ required: true, message: "请选择专业!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 10 }}
          name="className"
          label="班级名称"
          placeholder="请输入班级名称"
          rules={[{ required: true, message: "请输入班级名称!" }]}
        />
        <ProFormSelect
          colProps={{ xl: 10 }}
          request={async () => {
            const { data } = await teacherListApi({
              pageNum: 1,
              pageSize: 400,
            });
            return data.list.map((item) => ({
              ...item,
              label: item.teacherName,
              value: item.id,
            }));
          }}
          name="headmasterId"
          label="班主任"
          rules={[{ required: true, message: "请选择班主任!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 10 }}
          request={async () => {
            const { data } = await teacherListApi({
              pageNum: 1,
              pageSize: 400,
            });
            return data.list.map((item) => ({
              ...item,
              label: item.teacherName,
              value: item.id,
            }));
          }}
          name="headmasterId"
          label="年级"
          rules={[{ required: true, message: "请选择年级!" }]}
        />
        <ProFormSelect
          colProps={{ xl: 10 }}
          request={async () => {
            const { data } = await teacherListApi({
              pageNum: 1,
              pageSize: 400,
            });
            return data.list.map((item) => ({
              ...item,
              label: item.teacherName,
              value: item.id,
            }));
          }}
          name="headmasterId"
          label="任课老师"
          rules={[{ required: true, message: "请选择任课老师!" }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          colProps={{ xl: 24 }}
          trigger="onBlur"
          valueEnum={classesStateEnum}
          name="state"
          label="状态"
          rules={[{ required: true, message: "请选择状态!" }]}
        />
      </ProForm.Group>
      {/*<ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />

        <ProFormText
          width="md"
          name="company"
          label="我方公司名称"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="contract"
          label="合同名称"
          placeholder="请输入名称"
        />
        <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: "chapter",
              label: "盖章后生效",
            },
          ]}
          width="xs"
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: "time",
              label: "履行完终止",
            },
          ]}
          name="unusedMode"
          label="合同约定失效效方式"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="主合同编号" />
      <ProFormText
        name="project"
        disabled
        label="项目名称"
        initialValue="xxxx项目"
      />
      <ProFormText
        width="xs"
        name="mangerName"
        disabled
        label="商务经理"
        initialValue="启途"
      />*/}
    </ModalForm>
  );
};

export default EditFormModal;
