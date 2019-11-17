import React, { useContext, useEffect } from "react";
import { Col, Row, Empty, Spin } from "antd";
import { StoreContext, EffectContext } from "@/App";
import { GET_PROJECTS, Project } from "@/services/projects";
import { ProjectGridItem } from "./components/ProjectGridItem";
import "./index.scss";

const useInitProjectsData = () => {
  const effect = useContext(EffectContext);
  useEffect(() => {
    effect({
      type: GET_PROJECTS
    });
  }, []);
};

const ProjectGrid: React.FC = () => {
  useInitProjectsData();
  const { loading } = useContext(StoreContext);
  const {
    projects: { projects }
  } = useContext(StoreContext);
  return (
    <Spin spinning={loading[GET_PROJECTS] || false}>
      <div className="project-grid-component">
        {projects.length > 0 ? (
          <Row gutter={16}>
            {projects.map((project: Project) => (
              <Col span={6} key={project.id}>
                <ProjectGridItem project={project} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="暂无 mock 项目，快点击下方加号添加吧！" />
        )}
      </div>
    </Spin>
  );
};

export { ProjectGrid };
