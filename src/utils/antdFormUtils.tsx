import { Form, Input, Select } from "antd";
import React from "react";
import { WrappedFormUtils } from "antd/lib/form/Form";

export const renderNormalInput = ({
  label,
  key,
  required = true,
  max = 0,
  getFieldDecorator,
  onPressEnter = () => {},
  placeholder
}: {
  label: string;
  key: string;
  required: boolean;
  max?: number;
  onPressEnter?: () => void;
  placeholder?: string;
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
      })(
        <Input
          onPressEnter={onPressEnter}
          placeholder={placeholder || `请输入${label}`}
        />
      )}
    </Form.Item>
  );
};

export const renderNormalSelect = ({
  label,
  key,
  required,
  getFieldDecorator,
  placeholder,
  options
}: {
  label: string;
  key: string;
  required: boolean;
  getFieldDecorator: WrappedFormUtils["getFieldDecorator"];
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
}): React.ReactElement => {
  const rules = [];
  if (required) {
    rules.push({
      required: true,
      message: `${label}不得为空`
    });
  }
  const { Option } = Select;
  return (
    <Form.Item label={label}>
      {getFieldDecorator(key, {
        rules
      })(
        <Select placeholder={placeholder || `请选择${label}`}>
          {options.map(option => (
            <Option key={option.value}>{option.label}</Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};
