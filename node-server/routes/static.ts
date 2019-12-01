import * as path from "path";
import * as fs from "fs";
import { IncomingMessage, ServerResponse } from "http";
import * as mimeTypes from "mime-types";
import { generateErrorResponse } from "../utils/util";

const checkIsStaticRegex = /\/mockServer\/static\/(?<fileName>.+)/;

const handleStaticRoutes = (
  request: IncomingMessage,
  response: ServerResponse,
  pathname: string
) => {
  const result = checkIsStaticRegex.exec(pathname);
  if (!result || !result.groups) {
    generateErrorResponse({ response, code: "40000" });
    return;
  }
  const { fileName } = result.groups;
  const fileFullPath = path.resolve(__dirname, "../../build", fileName);
  fs.readFile(fileFullPath, "utf8", (error, data) => {
    if (error) {
      generateErrorResponse({
        response,
        code: "50000",
        msg: error.message.toString()
      });
      return;
    }
    response.setHeader(
      "Content-Type",
      mimeTypes.lookup(fileName) || "text/plain"
    );
    response.statusCode = 200;
    response.end(data);
  });
};

const staticRoute = {
  handler: handleStaticRoutes
};

export { checkIsStaticRegex, staticRoute };
