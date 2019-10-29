import axios, { AxiosRequestConfig } from "axios";
import { messageUtil } from "@/utils/messageUtil";
import { API_ENUM } from "@/constants/api";
import { SERVICE_ERROR_MSG } from "@/constants/global";

export interface ServerResponse<T> {
  code: number;
  msg: string;
  result: T;
}

export const URL_PATH_JOIN = ({
  type = API_ENUM.BASE,
  path
}: {
  type?: API_ENUM;
  path: string;
}): string => {
  return `${type}/${path}`;
};

export const request = <T>(config: AxiosRequestConfig) => {
  return axios.request<ServerResponse<T>>(config).then(
    response => {
      if (String(response.data.code) !== "0") {
        messageUtil({
          type: "error",
          msg: response.data.msg || SERVICE_ERROR_MSG
        });
        return Promise.reject(response.data);
      }
      return response.data;
    },
    error => {
      messageUtil({
        type: "error",
        msg: SERVICE_ERROR_MSG
      });
      return Promise.reject(error);
    }
  );
};
