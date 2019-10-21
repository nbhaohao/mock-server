import React, {
  useRef,
  useCallback,
  MutableRefObject,
  useContext
} from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import { WrappedFormUtils } from "antd/lib/form/Form";

import { ProjectForm } from "../ProjectForm";
import { EffectContext, StoreContext } from "@/App";

interface ProjectFormModalProps extends ModalProps {}

interface addFormValues {
  project_name: string;
  origin_api_path: string;
}

const useProjectForm = (
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
): [
  MutableRefObject<null>,
  (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
] => {
  const formEl = useRef<WrappedFormUtils>(null);
  const effect = useContext(EffectContext);
  const handleAddForm = useCallback(
    (values: addFormValues) => {
      console.log("values", values);
      effect({
        type: "projects/addNewProject"
      });
    },
    [effect]
  );
  const checkAddFormValid = useCallback(() => {
    const { current } = formEl;
    if (current === null) {
      return;
    }
    current.validateFields((error, values: addFormValues) => {
      if (error) {
        return;
      }
      handleAddForm(values);
    });
  }, [formEl, onCancel, handleAddForm]);

  // @ts-ignore
  return [formEl, checkAddFormValid];
};

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  visible,
  title,
  onCancel
}) => {
  const [formEl, checkAddFormValid] = useProjectForm(onCancel);
  const { loading } = useContext(StoreContext);
  const addProjectLoading = loading["projects/addNewProject"];
  return (
    <Modal
      confirmLoading={addProjectLoading}
      visible={visible}
      title={title}
      onCancel={onCancel}
      onOk={checkAddFormValid}
    >
      <ProjectForm ref={formEl} />
    </Modal>
  );
};

export { ProjectFormModal };
