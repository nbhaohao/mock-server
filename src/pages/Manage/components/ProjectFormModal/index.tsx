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
  PUT_PROJECT,
  SAVE_PROJECTS
} from "@/services/projects";
import { ServerResponse } from "@/utils/request";
import { messageUtil } from "@/utils/messageUtil";
import { ADD_PROJECT_SUCCESS, PUT_PROJECT_SUCCESS } from "@/constants/projects";

interface ProjectFormModalProps extends ModalProps {
  editInitialProject: Project;
}

interface addFormValues {
  project_name: string;
  origin_api_path: string;
}

const useProjectForm = (
  onCancel:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined,
  editInitialProject: Project
): [
  MutableRefObject<null>,
  (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
] => {
  const formEl = useRef<WrappedFormUtils>(null);
  const effect = useContext(EffectContext);
  const dispatch = useContext(DispatchContext);
  const {
    projects: { projects }
  } = useContext(StoreContext);
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

  const handleEditForm = useCallback(
    async (values: addFormValues, event) => {
      const response: ServerResponse<Project> = await effect({
        type: PUT_PROJECT,
        payload: {
          ...values,
          id: editInitialProject.id
        }
      });
      dispatch({
        type: SAVE_PROJECTS,
        payload: projects.map((project: Project) => {
          if (project.id === response.result.id) {
            return response.result;
          }
          return project;
        })
      });
      messageUtil({ type: "success", msg: PUT_PROJECT_SUCCESS });
      onCancel && onCancel(event);
    },
    [effect, onCancel, dispatch, editInitialProject.id, projects]
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
        if (editInitialProject.id) {
          handleEditForm(values, event);
        } else {
          handleAddForm(values, event);
        }
      });
    },
    [formEl, handleAddForm, handleEditForm, editInitialProject.id]
  );

  // @ts-ignore
  return [formEl, checkAddFormValid];
};

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  visible,
  title,
  onCancel,
  editInitialProject
}) => {
  const [formEl, checkAddFormValid] = useProjectForm(
    onCancel,
    editInitialProject
  );
  const { loading } = useContext(StoreContext);
  const addProjectLoading = loading[ADD_PROJECT_ACTION];
  const putProjectLoading = loading[PUT_PROJECT];
  const extraProps = {
    initialProject: editInitialProject,
    onInputPressEnter: checkAddFormValid
  };
  return (
    <Modal
      destroyOnClose
      confirmLoading={addProjectLoading || putProjectLoading}
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
