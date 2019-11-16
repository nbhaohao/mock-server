import React from "react";
import { Project } from "@/services/projects";
import { Card } from "antd";
import "./index.scss";

interface ProjectGridItemProps {
  project: Project;
}

const ProjectGridItem: React.FC<ProjectGridItemProps> = ({ project }) => {
  return (
    <Card
      hoverable
      title={project.name}
      className="project-grid-item-component"
    >
      {project.url}
    </Card>
  );
};

export { ProjectGridItem };
