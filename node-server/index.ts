import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as URL from "url";
import * as queryString from "querystring";
import { PORT, API_PRE_FIX } from "./config";
import { projectsRoute } from "./routes/projects";
import { checkIsMockRoute, mockRoute } from "./routes/mock";

import { generateErrorResponse, handleAccessOrigin } from "./utils/util";

const server = http.createServer();
server.on(
  "request",
  async (request: IncomingMessage, response: ServerResponse) => {
    const { url, method } = request;
    handleAccessOrigin(response);
    if (method === undefined) {
      generateErrorResponse({ response, code: "20000" });
      return;
    }
    const parseUrl = URL.parse(url || "");
    const { pathname, query } = parseUrl;
    const searchParams = queryString.parse(query || "");
    if (pathname === `/${API_PRE_FIX}/${projectsRoute.path}`) {
      try {
        await projectsRoute.handler(request, response, searchParams);
      } catch (e) {
        generateErrorResponse({ response, code: "20000", msg: e.toString() });
      }
      return;
    }
    const isMockRoute = await checkIsMockRoute({ pathname: pathname || "" });
    console.log("isMockRoute", isMockRoute);
    console.log("请求 pathname", pathname);
    console.log("请求 query", query);
    console.log("请求 method", method);
    if (isMockRoute) {
      try {
        await mockRoute.handler(
          pathname || "",
          request,
          response,
          searchParams,
          isMockRoute.id
        );
      } catch (e) {
        generateErrorResponse({ response, code: "20000", msg: e.toString() });
      }
      return;
    }
    generateErrorResponse({ response, code: "20000" });
  }
);

server.listen(PORT, () => {
  console.log(`服务器启动成功，正在监听${PORT}端口`);
});
