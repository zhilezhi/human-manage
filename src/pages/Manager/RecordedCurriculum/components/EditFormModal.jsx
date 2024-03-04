import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { useRef, useState } from "react";
import { teacherListData } from "@/services/manager.js";
import {
  classesDetailApi,
  recordedCurriculumInsertOrUpdateApi,
} from "@/apis/index.js";
import { debounce } from "@/utils/tools.js";

import { baseUrl } from "@/utils/request.js";
import { ImagePreview } from "@/components/ImagePreview.jsx";

export default function EditFormModal(props) {
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
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
    await recordedCurriculumInsertOrUpdateApi({
      ...values,
      id: props.info.id,
      cover:
        values.cover.length &&
        values.cover.map((item) => item.response.data).join(),
    });
    message.success("提交成功");
  };

  const onPreviewImage = (file) => {
    setImagePreviewVisible(true);
    console.log({ file });
    return (
      /*      <ImagePreview
        visible={imagePreviewVisible}
        onCancel={() => setImagePreviewVisible(false)}
        url={file.thumbUrl}
      />*/
      <Modal getContainer={false} open={true} width={"40%"} zIndex={90000}>
        <div>1111</div>
      </Modal>
    );
  };

  return (
    <>
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
            name="courseName"
            label="课程名称"
            placeholder="请输入课程名称"
            rules={[{ required: true, message: "请输入课程名称!" }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormUploadButton
            label="封面图"
            name="cover"
            max={1}
            action={baseUrl + "/common/fileUpload"}
            listType={"picture-card"}
            accept={".jpg,.jpeg,.png"}
            extra="支持扩展名：.jpg .png .jpeg"
            fieldProps={{
              onPreview: onPreviewImage,
            }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea
            colProps={{ xl: 24 }}
            name="courseDescription"
            label="备注"
            placeholder="请输入备注"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            colProps={{ xl: 24 }}
            request={teacherListData}
            name="lecturerId"
            label="课程讲师"
            showSearch
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}
