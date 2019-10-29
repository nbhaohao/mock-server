import { message } from "antd";

type NoticeType = "info" | "success" | "error" | "warning" | "loading";

const messageUtil = ({ type, msg }: { type: NoticeType; msg: string }) => {
  message[type](msg);
};

export { messageUtil };
