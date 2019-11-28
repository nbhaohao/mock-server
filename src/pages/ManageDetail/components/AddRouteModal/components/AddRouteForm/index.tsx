import React from "react";
import { Form } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { renderNormalInput, renderNormalSelect } from "@/utils/antdFormUtils";
import { FORM_WRAPPER_COL, FORM_LABEL_COL } from "@/constants/form";
import { JSONEditor } from "./components/JSONEditor";
import { ProjectRoute } from "@/services/projects";

interface AddRouteFormProps {
  form: WrappedFormUtils;
  route: ProjectRoute;
}

const _AddRouteForm: React.FC<AddRouteFormProps> = ({ form, route }) => {
  const { getFieldDecorator } = form;
  const routeNameInput = renderNormalInput({
    label: "路由名称",
    key: "name",
    required: true,
    max: 10,
    getFieldDecorator,
    initialValue: route.name || ""
  });
  const methodSelect = renderNormalSelect({
    label: "路由方法",
    key: "method",
    required: true,
    getFieldDecorator,
    options: [
      { value: "get", label: "GET" },
      { value: "post", label: "POST" },
      { value: "put", label: "POST" },
      { value: "delete", label: "DELETE" }
    ],
    initialValue: route.method || ""
  });
  const routePathInput = renderNormalInput({
    label: "路由路径",
    key: "path",
    required: true,
    max: 99,
    getFieldDecorator,
    placeholder: "例如：goods/get、goods",
    initialValue: route.path || ""
  });
  const responseLabel = "mock数据";
  const responseEditor = (
    <Form.Item label={responseLabel} required>
      {getFieldDecorator("mockResponse", {
        initialValue: route.mockResponse || "",
        rules: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(`${responseLabel}不得为空`);
                return;
              }
              try {
                const result = JSON.parse(value);
                if (typeof result === "object") {
                  callback();
                  return;
                }
                callback("无效的JSON数据");
              } catch (e) {
                callback("无效的JSON数据");
              }
            }
          }
        ]
      })(<JSONEditor />)}
    </Form.Item>
  );
  return (
    <Form wrapperCol={FORM_WRAPPER_COL} labelCol={FORM_LABEL_COL}>
      {routeNameInput}
      {methodSelect}
      {routePathInput}
      {responseEditor}
    </Form>
  );
};

const AddRouteForm = Form.create<AddRouteFormProps>()(_AddRouteForm);

export { AddRouteForm };
