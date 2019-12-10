import { dbUtil } from "../db/dbUtil";
import { IncomingMessage, ServerResponse } from "http";
import {
  generateErrorResponse,
  generateSuccessResponse,
  handleAccessOrigin
} from "../utils/util";
import { proxyRequest } from "../utils/proxy";
import { Project } from "../types/db";

const generateUrlCheckReg = (url: string) => {
  // eslint-disable-next-line no-useless-escape
  return new RegExp(`\/${url}\/(?<path>.*)`);
};

const checkIsMockRoute = async ({
  pathname
}: {
  pathname: string;
}): Promise<{ result: boolean; id: string }> => {
  const projectsArray = await dbUtil.getDbData();
  for (let i = 0; i < projectsArray.length; i++) {
    const projectItem = projectsArray[i];
    const urlReg = generateUrlCheckReg(projectItem.url);
    if (urlReg.test(pathname)) {
      return {
        result: true,
        id: projectItem.id
      };
    }
  }
  return {
    result: false,
    id: ""
  };
};

const handleMockRoute = ({
  path,
  request,
  response,
  query,
  projectItem
}: {
  path: string;
  request: IncomingMessage;
  response: ServerResponse;
  query: string;
  projectItem: Project;
}) => {
  if (request.method === "OPTIONS") {
    handleAccessOrigin(response);
    generateSuccessResponse({
      response,
      result: {}
    });
    return;
  }
  const mockRoute = projectItem.routes.find(
    route =>
      route.path === path && route.method.toUpperCase() === request.method
  );
  // 走代理请求
  if (mockRoute === undefined || mockRoute.state !== "enabled") {
    const queryString = query ? `?${query}` : "";
    proxyRequest({
      url: `http://${projectItem.url}/${path}${queryString}`,
      originRequest: request,
      originResponse: response
    });
    return;
  }
  handleAccessOrigin(response);
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(JSON.parse(mockRoute.mockResponse)));
};

const handleMockRoutes = async (
  pathname: string,
  request: IncomingMessage,
  response: ServerResponse,
  query: string,
  mockId: string
) => {
  const projectsArray = await dbUtil.getDbData();
  const projectItem = projectsArray.find(project => project.id === mockId);
  if (projectItem === undefined) {
    generateErrorResponse({ response, code: "20000", msg: "找不到对应的项目" });
    return;
  }
  const pathRegResult = generateUrlCheckReg(projectItem.url).exec(pathname);
  if (!pathRegResult || !pathRegResult.groups) {
    generateErrorResponse({ response, code: "20000", msg: "找不到对应的项目" });
    return;
  }
  const { path } = pathRegResult.groups;
  handleMockRoute({ path, request, response, query, projectItem });
};

const mockRoute = {
  handler: handleMockRoutes
};

export { checkIsMockRoute, mockRoute };
