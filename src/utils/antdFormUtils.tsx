import { Form, Input } from "antd";
import React from "react";
import { WrappedFormUtils } from "antd/lib/form/Form";

export const renderNormalInput = ({
  label,
  key,
  required = true,
  max = 0,
  getFieldDecorator
}: {
  label: string;
  key: string;
  required: boolean;
  max?: number;
  getFieldDecorator: WrappedFormUtils["getFieldDecorator"];
}): React.ReactElement => {
  const rules = [];
  if (required) {
    rules.push({
      required: true,
      message: `${label}不得为空`
    });
  }
  if (max !== 0) {
    rules.push({
      max,
      message: `${label}不得超过${max}个字`
    });
  }
  return (
    <Form.Item label={label}>
      {getFieldDecorator(key, {
        rules
      })(<Input placeholder={`请输入${label}`} />)}
    </Form.Item>
  );
};
