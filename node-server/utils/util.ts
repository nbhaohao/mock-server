import { IncomingMessage, ServerResponse } from "http";

type ErrorCode = "20000" | "50000";

type CodeMessageMapType = { [key in ErrorCode]: string };

const codeMessageMap: CodeMessageMapType = {
  "20000": "找不到该路由",
  "50000": "系统错误"
};

// 生成成功
export const generateSuccessResponse = ({
  response,
  result = {},
  code = 0,
  msg = "success"
}: {
  response: ServerResponse;
  result?: {};
  code?: number;
  msg?: string;
}): void => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(
    JSON.stringify({
      code,
      result,
      msg
    })
  );
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
      msg: msg || codeMessageMap[code],
      result: {}
    })
  );
};

// 解析 request body 内容
export const parseRequestBody = <T>(request: IncomingMessage) => {
  return new Promise<T>(resolve => {
    const bufferArray: Array<Buffer> = [];
    let data: T;
    request.on("data", (chunk: Buffer) => {
      bufferArray.push(chunk);
    });
    request.on("end", () => {
      try {
        data = JSON.parse(Buffer.concat(bufferArray).toString());
      } catch (e) {}
      resolve(data);
    });
  });
};

// 生成一个随机 id
export const generateRandomId = () => {
  return (
    new Date().getTime().toString(36) +
    Math.random()
      .toString(36)
      .slice(2)
  );
};
