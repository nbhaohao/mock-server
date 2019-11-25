import React, { useState, useCallback, useContext } from "react";
import { PageTitle } from "@/components/PageTitle";
import "./index.scss";
import { DELETE_PROJECT_SUCCESS } from "@/constants/projects";
import { FloatAddButton } from "./components/FloatAddButton";
import { ProjectFormModal } from "./components/ProjectFormModal";
import { ProjectGrid } from "./components/ProjectGrid";
import { deleteProject, Project } from "@/services/projects";
import { message } from "antd";
import { DispatchContext, StoreContext } from "@/App";
import { PROJECT_STORE } from "@/constants/store";

const useShowAddOrEditModal = (): [boolean, () => void, () => void] => {
  const [modalVisibility, changeModalVisibility] = useState(false);
  const showModal = useCallback(() => {
    changeModalVisibility(true);
  }, [changeModalVisibility]);
  const hiddenModal = useCallback(() => {
    changeModalVisibility(false);
  }, [changeModalVisibility]);
  return [modalVisibility, showModal, hiddenModal];
};

const Manage: React.FC = () => {
  const [modalVisibility, showModal, hiddenModal] = useShowAddOrEditModal();
  const [tempProject, setTempProject] = useState<Project>({
    name: "",
    url: "",
    id: "",
    routes: []
  });
  const handleEditProject = useCallback(
    (project: Project) => {
      setTempProject(project);
      showModal();
    },
    [showModal, setTempProject]
  );
  const {
    projects: { projects }
  } = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  const handleDeleteProject = useCallback(
    (project: Project) => () => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          await deleteProject({ id: project.id });
          message.success(DELETE_PROJECT_SUCCESS);
          dispatch({
            type: `${PROJECT_STORE}/updateProjects`,
            payload: projects.filter(
              (projectItem: Project) => projectItem.id !== project.id
            )
          });
          resolve();
        } catch (e) {
          reject();
        }
      });
    },
    [projects, dispatch]
  );
  const handleAddProject = useCallback(() => {
    setTempProject({ name: "", url: "", id: "", routes: [] });
    showModal();
  }, [setTempProject, showModal]);
  return (
    <div className="manage-component">
      <PageTitle title="全部项目" />
      <ProjectGrid
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
      />
      <FloatAddButton onClick={handleAddProject} />
      <ProjectFormModal
        editInitialProject={tempProject}
        visible={modalVisibility}
        title="添加项目"
        onCancel={hiddenModal}
      />
    </div>
  );
};

export { Manage };
