import { IncomingMessage, ServerResponse } from "http";
import {
  generateErrorResponse,
  parseRequestBody,
  generateSuccessResponse
} from "../utils/util";
import { dbUtil } from "../db/dbUtil";
import { addProjectBody } from "../types/projects";

const addProject = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  const jsonBody = await parseRequestBody<addProjectBody>(request);
  const projectsArray = await dbUtil.getDbData();
  if (projectsArray.find(project => project.name) !== undefined) {
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

const handler: { [key: string]: any } = {
  POST: addProject
};

const handleProjectsRoutes = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
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
