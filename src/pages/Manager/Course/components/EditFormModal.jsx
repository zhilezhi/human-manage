import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useRef } from "react";
import {
  classesListData,
  classesListDataByMajor,
  majorListData,
} from "@/services/manager.js";
import { classesCurriculumInsertOrUpdateApi } from "@/apis/index.js";
import { debounce } from "@/utils/tools.js";
import { baseUrl } from "@/utils/request.js";

const EditFormModal = (props) => {
  // console.log({ props });
  const formRef = useRef();

  const onSubmitFormData = async (values) => {
    Object.assign(values, {
      id: props.info.id,
      // classId: props.info.classId,
      teachingProgram:
        values.teachingProgram.length &&
        values.teachingProgram.map((item) => item.response.data).join(),
    });
    console.log({ values });

    await classesCurriculumInsertOrUpdateApi(values);

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
        {/*        <ProFormText
          colProps={{ xl: 24 }}
          name="className"
          label="班级名称"
          placeholder="请输入班级名称"
          rules={[{ required: true, message: "请输入班级名称!" }]}
        />*/}

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
          label="班级名称"
          rules={[{ required: true, message: "请选择班级名称!" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          colProps={{ xl: 24 }}
          name="courseName"
          label="课程名称"
          placeholder="请输入课程名称"
          rules={[{ required: true, message: "请输入课程名称!" }]}
        />
      </ProForm.Group>{" "}
      <ProForm.Group>
        <ProFormDigit
          name="totalClassHours"
          label="总课时"
          colProps={{ xl: 24 }}
          placeholder="请输入总课时"
          rules={[{ required: true, message: "请输入总课时!" }]}
        />
      </ProForm.Group>
      {!props.info.id ? (
        <ProForm.Group>
          <ProFormUploadButton
            label="教学大纲附件"
            name="teachingProgram"
            max={9}
            action={baseUrl + "/common/fileUpload"}
          />
        </ProForm.Group>
      ) : (
        ""
      )}
    </ModalForm>
  );
};

export default EditFormModal;
