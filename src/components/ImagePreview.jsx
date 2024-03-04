import { Modal } from "antd";

export const ImagePreview = (props) => {
  return (
    <Modal open={props.visible} footer={null} onCancel={props.onCancel()}>
      <img
        alt="example"
        style={{ width: "200px", height: "200px" }}
        src={props.url}
      />
    </Modal>
  );
};
