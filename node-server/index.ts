#!/usr/bin/env node

import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as URL from "url";
import * as queryString from "querystring";
import { PORT, API_PRE_FIX } from "./config";
import { projectsRoute } from "./routes/projects";
import { checkIsMockRoute, mockRoute } from "./routes/mock";
import { checkIsStaticRegex, staticRoute } from "./routes/static";
import { dbUtil } from "./db/dbUtil";

import { generateErrorResponse, handleAccessOrigin } from "./utils/util";

try {
  (async () => {
    await dbUtil.initDb();
  })();
} catch (e) {
  console.log(e.toString());
}

const server = http.createServer();
server.on(
  "request",
  async (request: IncomingMessage, response: ServerResponse) => {
    const { url, method } = request;
    if (method === undefined) {
      generateErrorResponse({ response, code: "20000" });
      return;
    }
    const parseUrl = URL.parse(url || "");
    const { pathname, query } = parseUrl;
    const searchParams = queryString.parse(query || "");
    if (pathname === `/${API_PRE_FIX}/${projectsRoute.path}`) {
      handleAccessOrigin(response);
      try {
        await projectsRoute.handler(request, response, searchParams);
      } catch (e) {
        generateErrorResponse({ response, code: "20000", msg: e.toString() });
      }
      return;
    }
    if (checkIsStaticRegex.test(pathname || "")) {
      if (method !== "GET") {
        generateErrorResponse({ response, code: "40000" });
        return;
      }
      try {
        await staticRoute.handler(request, response, pathname || "");
      } catch (e) {
        generateErrorResponse({ response, code: "40000" });
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
          query || "",
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
  console.log(
    `网页端启动成功，http://localhost:${PORT}/mockServer/static/index.html/#/manage`
  );
});
