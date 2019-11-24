import { IncomingMessage, ServerResponse } from "http";
import {
  generateErrorResponse,
  parseRequestBody,
  generateSuccessResponse,
  generateRandomId
} from "../utils/util";
import { dbUtil } from "../db/dbUtil";
import { addProjectBody } from "../types/projects";
import { Project } from "../types/db";

const findTargetProject = ({
  projectsArray,
  id
}: {
  projectsArray: Array<Project>;
  id: string;
}): Project | undefined => {
  return projectsArray.find(project => project.id === id);
};

const getProject = async (
  request: IncomingMessage,
  response: ServerResponse,
  searchParams: { id?: string }
) => {
  const projectsArray = await dbUtil.getDbData();
  const { id } = searchParams;
  if (id) {
    const targetProject = findTargetProject({ projectsArray, id });
    if (targetProject) {
      generateSuccessResponse({
        response,
        result: targetProject
      });
      return;
    }
    generateErrorResponse({ response, code: "20000", msg: "未找到项目" });
    return;
  }
  generateSuccessResponse({
    response,
    result: projectsArray
  });
};

const addProject = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  const jsonBody = await parseRequestBody<addProjectBody>(request);
  const projectsArray = await dbUtil.getDbData();
  if (
    projectsArray.find(project => project.name === jsonBody.name) !== undefined
  ) {
    generateErrorResponse({ response, code: "20000", msg: "项目名已存在" });
    return;
  }
  projectsArray.push({ ...jsonBody, id: generateRandomId(), routes: [] });
  await dbUtil.saveDbData(projectsArray);
  generateSuccessResponse({
    response,
    result: projectsArray
  });
};

const putProject = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  const jsonBody = await parseRequestBody<addProjectBody>(request);
  let projectsArray = await dbUtil.getDbData();
  const { id, ...params } = jsonBody;
  const targetProject = findTargetProject({ projectsArray, id });
  if (!targetProject) {
    generateErrorResponse({ response, code: "20000", msg: "未找到项目" });
    return;
  }
  const isRepeatName = projectsArray.find(
    project => project.id !== id && project.name === params.name
  );
  if (isRepeatName) {
    generateErrorResponse({ response, code: "20000", msg: "项目名称不得重复" });
    return;
  }
  const newProject: Project = { id: "", name: "", url: "", routes: [] };
  projectsArray = projectsArray.map(project => {
    if (project.id === id) {
      for (const key in project) {
        if (key in params) {
          // @ts-ignore
          newProject[key] = params[key];
        } else {
          // @ts-ignore
          newProject[key] = project[key];
        }
      }
      return newProject;
    }
    return project;
  });
  await dbUtil.saveDbData(projectsArray);
  generateSuccessResponse({
    response,
    result: newProject
  });
};

const handleOptions = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  generateSuccessResponse({
    response,
    result: {}
  });
};

const handler: { [key: string]: any } = {
  GET: getProject,
  POST: addProject,
  OPTIONS: handleOptions,
  PUT: putProject
};

const handleProjectsRoutes = async (
  request: IncomingMessage,
  response: ServerResponse,
  searchParams: {}
) => {
  const { method } = request;
  if (method === undefined) {
    generateErrorResponse({ response, code: "20000" });
    return;
  }
  if (method in handler) {
    return handler[method](request, response, searchParams);
  }
  generateErrorResponse({ response, code: "20000" });
};

const projectsRoute = {
  path: "projects",
  handler: handleProjectsRoutes
};

export { projectsRoute };
