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
import { EffectContext, StoreContext, DispatchContext } from "@/App";
import {
  ADD_PROJECT_ACTION,
  Project,
  SAVE_PROJECTS
} from "@/services/projects";
import { ServerResponse } from "@/utils/request";
import { messageUtil } from "@/utils/messageUtil";
import { ADD_PROJECT_SUCCESS } from "@/constants/projects";

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
  const dispatch = useContext(DispatchContext);
  const handleAddForm = useCallback(
    async (values: addFormValues, event) => {
      const response: ServerResponse<Array<Project>> = await effect({
        type: ADD_PROJECT_ACTION,
        payload: values
      });
      dispatch({
        type: SAVE_PROJECTS,
        payload: response.result
      });
      messageUtil({ type: "success", msg: ADD_PROJECT_SUCCESS });
      onCancel && onCancel(event);
    },
    [effect, onCancel, dispatch]
  );
  const checkAddFormValid = useCallback(
    event => {
      const { current } = formEl;
      if (current === null) {
        return;
      }
      current.validateFields((error, values: addFormValues) => {
        if (error) {
          return;
        }
        handleAddForm(values, event);
      });
    },
    [formEl, handleAddForm]
  );

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
  const addProjectLoading = loading[ADD_PROJECT_ACTION];
  const extraProps = {
    onInputPressEnter: checkAddFormValid
  };
  return (
    <Modal
      destroyOnClose
      confirmLoading={addProjectLoading}
      visible={visible}
      title={title}
      onCancel={onCancel}
      onOk={checkAddFormValid}
    >
      <ProjectForm ref={formEl} {...extraProps} />
    </Modal>
  );
};

export { ProjectFormModal };
