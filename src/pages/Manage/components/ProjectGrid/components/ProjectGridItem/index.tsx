import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Project } from "@/services/projects";
import { Card, Icon } from "antd";
import "./index.scss";

interface ProjectGridItemProps {
  project: Project;
  onEditProject: (project: Project) => void;
}

const ProjectGridItem: React.FC<ProjectGridItemProps> = ({
  project,
  onEditProject
}) => {
  const history = useHistory();

  const handleJumpToProjectDetail = useCallback(() => {
    history.push(`/manage/${project.id}`);
  }, [history, project.id]);
  const handleEditProject = useCallback(() => {
    onEditProject(project);
  }, [project, onEditProject]);
  const actions = [
    <Icon type="edit" key="edit" onClick={handleEditProject} />,
    <Icon type="table" key="detail" onClick={handleJumpToProjectDetail} />
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
