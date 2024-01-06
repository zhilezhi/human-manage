import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useRef } from "react";
import { classesStateEnum } from "@/constants/index.js";
import {
  classesListData,
  majorListData,
  teacherListData,
} from "@/services/manager.js";
import { getTwoYearArray } from "@/utils/tools.js";
import {
  classesInsertOrUpdateApi,
  classesTeacherDeleteApi,
  classesTeacherInsertOrUpdateApi,
} from "@/apis/index.js";

const EditFormModal = (props) => {
  console.log({ props });
  const formRef = useRef();

  //比对任课老师（产生的增加或者删除差异）
  const compareTeacher = (teacherIds, inTeacherIds) => {
    const addTeacherIds = [];
    const delTeacherIds = [];
    for (const val of inTeacherIds) {
      if (val) {
        if (!teacherIds.find((item) => item.value === val.value)) {
          addTeacherIds.push(val.value);
        }
      }
    }
    for (const val of teacherIds) {
      if (!inTeacherIds.find((item) => item.value === val.value)) {
        delTeacherIds.push(val.id);
      }
    }
    return { addTeacherIds, delTeacherIds };
  };

  const onSubmitFormData = async (values) => {
    Object.assign(values, { id: props.info.id });

    const { addTeacherIds, delTeacherIds } = compareTeacher(
      props.info.classesTeacherList,
      values.inTeacherIds,
    );
    const { data } = await classesInsertOrUpdateApi(values);
    if (data) {
      for (const val of addTeacherIds) {
        if (val) {
          await classesTeacherInsertOrUpdateApi({
            classId: data,
            teacherId: val,
          });
        }
      }
      for (const val of delTeacherIds) {
        if (val) {
          await classesTeacherDeleteApi({
            id: val,
          });
        }
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
          initialValue={props.info.classesTeacherList ?? []}
          request={teacherListData}
          name="inTeacherIds"
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
