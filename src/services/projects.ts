import { request, URL_PATH_JOIN } from "@/utils/request";
import { PROJECT_STORE } from "@/constants/store";

const projectsApiPath = URL_PATH_JOIN({ path: PROJECT_STORE });

export enum ProjectRouteMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete"
}
export interface ProjectRoute {
  name: string;
  method: ProjectRouteMethod;
  path: string;
  mockResponse: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  routes: Array<ProjectRoute>;
}

export interface PutProjectParams extends Project {}
export interface DeleteProjectParams {
  id: string;
}

export const ADD_PROJECT_ACTION = `${PROJECT_STORE}/addProject`;
export const SAVE_PROJECTS = `${PROJECT_STORE}/updateProjects`;
export const GET_PROJECTS = `${PROJECT_STORE}/getProjects`;
export const QUERY_PROJECT = `${PROJECT_STORE}/queryProject`;
export const PUT_PROJECT = `${PROJECT_STORE}/putProject`;

export const addProject = (params: Project) =>
  request<Array<Project>>({
    url: projectsApiPath,
    method: "POST",
    data: params
  });

export const putProject = (params: PutProjectParams) =>
  request<Project>({
    url: projectsApiPath,
    method: "PUT",
    data: params
  });

export const deleteProject = (params: DeleteProjectParams) =>
  request<Project>({
    url: projectsApiPath,
    method: "DELETE",
    data: params
  });

export const queryProject = (params: { id: string }) => {
  return request<Project>({
    url: `${projectsApiPath}?id=${params.id}`,
    method: "GET",
    data: {}
  });
};

export const getProjectsData = () =>
  request<Array<Project>>({
    url: projectsApiPath,
    method: "GET"
  });
