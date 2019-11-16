import { IncomingMessage, ServerResponse } from "http";
import {
  generateErrorResponse,
  parseRequestBody,
  generateSuccessResponse
} from "../utils/util";
import { dbUtil } from "../db/dbUtil";
import { addProjectBody } from "../types/projects";

const getProject = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  const projectsArray = await dbUtil.getDbData();
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
  projectsArray.push(jsonBody);
  await dbUtil.saveDbData(projectsArray);
  generateSuccessResponse({
    response,
    result: projectsArray
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
  OPTIONS: handleOptions
};

const handleAccessOrigin = (response: ServerResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  response.setHeader("Access-Control-Allow-Headers", "*");
};

const handleProjectsRoutes = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  handleAccessOrigin(response);
  const { method } = request;
  if (method === undefined) {
    generateErrorResponse({ response, code: "20000" });
    return;
  }
  if (method in handler) {
    return handler[method](request, response);
  }
  generateErrorResponse({ response, code: "20000" });
};

const projectsRoute = {
  path: "projects",
  handler: handleProjectsRoutes
};

export { projectsRoute };
