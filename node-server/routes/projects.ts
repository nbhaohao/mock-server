import { IncomingMessage, ServerResponse } from "http";
import { generateErrorResponse, parseRequestBody } from "../utils/util";
import { dbUtil } from "../db/dbUtil";

const addProject = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  const jsonBody = await parseRequestBody(request);
  const dbData = await dbUtil.getDbData();
  console.log("jsonBody", jsonBody);
  response.end("hi");
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
