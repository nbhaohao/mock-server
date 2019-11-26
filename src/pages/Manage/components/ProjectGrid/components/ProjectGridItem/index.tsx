import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Project } from "@/services/projects";
import { Card, Icon } from "antd";
import { ModalRequestDelete } from "@/utils/modalUtil";
import "./index.scss";

interface ProjectGridItemProps {
  project: Project;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => () => Promise<void>;
}

const ProjectGridItem: React.FC<ProjectGridItemProps> = ({
  project,
  onEditProject,
  onDeleteProject
}) => {
  const history = useHistory();

  const handleJumpToProjectDetail = useCallback(() => {
    history.push(`/manage/${project.id}`);
  }, [history, project.id]);
  const handleEditProject = useCallback(() => {
    onEditProject(project);
  }, [project, onEditProject]);
  const handleDeleteProject = useCallback(() => {
    ModalRequestDelete({
      title: "提示",
      content: "你确定要删除这个项目吗？",
      onOk: onDeleteProject({
        ...project,
        routes: project.routes.filter(item => item.name !== project.name)
      })
    });
  }, [onDeleteProject, project]);
  const actions = [
    <Icon type="edit" key="edit" onClick={handleEditProject} />,
    <Icon type="table" key="detail" onClick={handleJumpToProjectDetail} />,
    <Icon type="delete" key="delete" onClick={handleDeleteProject} />
  ];

  return (
    <Card
      actions={actions}
      hoverable
      title={project.name}
      className="project-grid-item-component"
    >
      {project.url}
    </Card>
  );
};

export { ProjectGridItem };
