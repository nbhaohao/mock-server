import React, { useState, useCallback } from "react";
import { PageTitle } from "@/components/PageTitle";
import "./index.scss";
import { FloatAddButton } from "./components/FloatAddButton";
import { ProjectFormModal } from "./components/ProjectFormModal";
import { ProjectGrid } from "./components/ProjectGrid";
import { Project } from "@/services/projects";

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
  const handleAddProject = useCallback(() => {
    setTempProject({ name: "", url: "", id: "", routes: [] });
    showModal();
  }, [setTempProject]);
  return (
    <div className="manage-component">
      <PageTitle title="全部项目" />
      <ProjectGrid onEditProject={handleEditProject} />
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
