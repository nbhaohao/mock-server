import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Spin, Button } from "antd";
import "./index.scss";
import { PageTitle } from "@/components/PageTitle";
import { ChildRouteTable } from "./components/ChildRouteTable";
import { AddRouteModal } from "./components/AddRouteModal";
import { EffectContext, StoreContext } from "@/App";
import {
  PUT_PROJECT,
  Project,
  QUERY_PROJECT,
  ProjectRoute,
  putProject,
  ProjectRouteMethod
} from "@/services/projects";
import { useModal } from "@/hooks/useModal";
import { messageUtil } from "@/utils/messageUtil";
import { EffectType } from "@/store";
import {
  ADD_PROJECT_ROUTE_SUCCESS,
  DELETE_PROJECT_ROUTE_SUCCESS, EDIT_PROJECT_ROUTE_SUCCESS
} from "@/constants/projects";

const useQueryProjectDetail = (id: string, effect: EffectType) => {
  const [projectObject, setProject] = useState<Project>({
    name: "",
    id: "",
    url: "",
    routes: []
  });
  useEffect(() => {
    const fetchProject = async () => {
      const response = await effect({
        type: QUERY_PROJECT,
        payload: {
          id
        }
      });
      setProject(response.result);
    };
    fetchProject();
  }, [id]);
  return {
    projectObject,
    setProject
  };
};

const generateDefaultProjectRoute = (): ProjectRoute => ({
  name: "",
  method: ProjectRouteMethod.GET,
  path: "",
  mockResponse: ""
});

const ManageDetail: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const effect = useContext(EffectContext);
  const { loading } = useContext(StoreContext);
  const { projectObject, setProject } = useQueryProjectDetail(id || "", effect);
  const [projectRoute, setProjectRoute] = useState<ProjectRoute>(
    generateDefaultProjectRoute()
  );
  const pageTitle = projectObject.name
    ? `项目详情-${projectObject.name}`
    : "项目详情";
  const isEditMode = projectRoute.name !== "";
  const { visible, showModal, hiddenModal } = useModal();
  const handleSubmitForm = useCallback(
    async values => {
      let newRoutes = [];
      if (isEditMode) {
        newRoutes = projectObject.routes.map(route => {
          if (route.name === projectRoute.name) {
            return values;
          }
          return route;
        });
      } else {
        newRoutes = projectObject.routes.concat(values);
      }
      await effect({
        type: PUT_PROJECT,
        payload: {
          id: projectObject.id,
          routes: newRoutes
        }
      });
      messageUtil({
        type: "success",
        msg: isEditMode ? EDIT_PROJECT_ROUTE_SUCCESS : ADD_PROJECT_ROUTE_SUCCESS
      });
      setProject({
        ...projectObject,
        routes: newRoutes
      });
      hiddenModal();
    },
    [projectObject, setProject, hiddenModal, isEditMode]
  );
  const handleBackToPage = useCallback(() => {
    history.push("/manage");
  }, [history]);
  const handleDeleteProjectRoute = useCallback(
    (route: ProjectRoute) => () => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const response = await putProject({
            ...projectObject,
            routes: projectObject.routes.filter(
              item => item.name !== route.name
            )
          });
          messageUtil({ type: "success", msg: DELETE_PROJECT_ROUTE_SUCCESS });
          setProject(response.result);
          resolve();
        } catch (e) {
          reject();
        }
      });
    },
    [projectObject, setProject]
  );
  const handleEditProjectRoute = useCallback(
    (route: ProjectRoute) => {
      setProjectRoute(route);
      showModal();
    },
    [setProjectRoute, showModal]
  );
  const handleAddProjectRoute = useCallback(() => {
    setProjectRoute(generateDefaultProjectRoute());
    showModal();
  }, [setProjectRoute, showModal]);
  return (
    <Spin spinning={loading[QUERY_PROJECT]}>
      <div className="manage-detail-component">
        <PageTitle title={pageTitle} />
        <div className="manage-detail-content-wrapper">
          <Button className="manage-back-button" onClick={handleBackToPage}>
            返回主页
          </Button>
          <Button
            type="primary"
            className="manage-detail-add-button"
            onClick={handleAddProjectRoute}
          >
            {isEditMode ? "编辑路由" : "添加路由"}
          </Button>
          <ChildRouteTable
            dataArray={projectObject.routes}
            onDeleteProjectRoute={handleDeleteProjectRoute}
            onEditProjectRoute={handleEditProjectRoute}
          />
        </div>
      </div>
      <AddRouteModal
        route={projectRoute}
        confirmLoading={loading[PUT_PROJECT]}
        visible={visible}
        onCancel={hiddenModal}
        onSubmitForm={handleSubmitForm}
      />
    </Spin>
  );
};

export { ManageDetail };
