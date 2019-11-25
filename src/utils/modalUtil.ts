import { ModalFuncProps } from "antd/lib/modal";
import { Modal } from "antd";

const ModalRequestDelete = (props: ModalFuncProps) => {
  Modal.confirm({
    okType: "danger",
    ...props
  });
};

export { ModalRequestDelete };
