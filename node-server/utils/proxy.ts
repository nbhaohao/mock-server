import { IncomingMessage, ServerResponse, request } from "http";
import {
  generateErrorResponse,
  handleAccessOrigin,
  parseRequestBody
} from "./util";
import * as zlib from "zlib";

const proxyRequest = async ({
  url,
  originRequest,
  originResponse
}: {
  url: string;
  originRequest: IncomingMessage;
  originResponse: ServerResponse;
}): Promise<void> => {
  console.log("代理 url", url);
  const proxyRq = request(
    url,
    {
      headers: originRequest.headers,
      method: originRequest.method
    },
    res => {
      let output: any;
      let body = "";
      // 有可能 response 是 gzip 的，所以这里需要处理一下
      if (res.headers["content-encoding"] === "gzip") {
        const gzip = zlib.createGunzip();
        res.pipe(gzip);
        output = gzip;
      } else {
        output = res;
      }
      output.on("data", (chunk: Buffer) => {
        body += chunk.toString();
      });
      output.on("end", () => {
        for (const key in res.headers) {
          originResponse.setHeader(key, <string>res.headers[key]);
        }
        originResponse.setHeader("Content-Encoding", "identity");
        originResponse.statusCode = res.statusCode || 200;
        originResponse.end(body);
      });
    }
  );
  proxyRq.on("error", e => {
    console.log("代理请求出错", e);
    handleAccessOrigin(originResponse);
    generateErrorResponse({
      response: originResponse,
      code: "20000",
      msg: e.message.toString()
    });
  });
  const requestBody = await parseRequestBody(originRequest, false);
  proxyRq.write(requestBody);
  proxyRq.end();
};

export { proxyRequest };
