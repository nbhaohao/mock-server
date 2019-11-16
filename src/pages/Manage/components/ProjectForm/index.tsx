import React from "react";
import { Form } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { renderNormalInput } from "@/utils/antdFormUtils";

interface ProjectFormProps {
  form: WrappedFormUtils;
  onInputPressEnter: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  form,
  onInputPressEnter
}) => {
  const { getFieldDecorator } = form;
  const projectInput = renderNormalInput({
    label: "项目名称",
    key: "name",
    required: true,
    max: 10,
    getFieldDecorator
  });
  const originApiPathInput = renderNormalInput({
    label: "真实 API 地址",
    key: "url",
    required: true,
    getFieldDecorator,
    onPressEnter: onInputPressEnter
  });
  return (
    <Form wrapperCol={{ span: 14 }} labelCol={{ span: 6 }}>
      {projectInput}
      {originApiPathInput}
    </Form>
  );
};

const _ProjectForm = Form.create()(ProjectForm);

export { _ProjectForm as ProjectForm };
