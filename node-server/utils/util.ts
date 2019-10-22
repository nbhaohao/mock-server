import { IncomingMessage, ServerResponse } from "http";

type ErrorCode = "20000" | "50000";

type CodeMessageMapType = { [key in ErrorCode]: string };

const codeMessageMap: CodeMessageMapType = {
  "20000": "找不到该路由",
  "50000": "系统错误"
};

// 生成错误码
export const generateErrorResponse = ({
  response,
  code,
  msg
}: {
  response: ServerResponse;
  code: keyof CodeMessageMapType;
  msg?: string;
}): void => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(
    JSON.stringify({
      code,
      msg: msg || codeMessageMap[code]
    })
  );
};

// 解析 request body 内容
export const parseRequestBody = (request: IncomingMessage) => {
  return new Promise(resolve => {
    let data: string | object = "";
    request.on("data", chunk => {
      data += chunk;
    });
    request.on("end", () => {
      try {
        data = JSON.parse(data.toString());
      } catch (e) {
        data = {};
      }
      resolve(data);
    });
  });
};
