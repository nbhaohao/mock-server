import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Project } from "@/services/projects";
import { Card, Icon } from "antd";
import "./index.scss";

interface ProjectGridItemProps {
  project: Project;
}

const ProjectGridItem: React.FC<ProjectGridItemProps> = ({ project }) => {
  const history = useHistory();

  const handleEditProject = useCallback(() => {
    history.push(`/manage/${project.id}`);
  }, [history, project.id]);

  const actions = [<Icon type="edit" key="edit" onClick={handleEditProject} />];

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
