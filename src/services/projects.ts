import { request, URL_PATH_JOIN } from "@/utils/request";
import { PROJECT_STORE } from "@/constants/store";

const projectsApiPath = URL_PATH_JOIN({ path: PROJECT_STORE });

export interface Project {
  name: string;
  url: string;
}

export const ADD_PROJECT_ACTION = `${PROJECT_STORE}/addProject`;
export const SAVE_PROJECTS = `${PROJECT_STORE}/updateProjects`;
export const GET_PROJECTS = `${PROJECT_STORE}/getProjects`;

export const addProject = (params: Project) =>
  request<Array<Project>>({
    url: projectsApiPath,
    method: "POST",
    data: params
  });

export const getProjectsData = () =>
  request<Array<Project>>({
    url: projectsApiPath,
    method: "GET"
  });
