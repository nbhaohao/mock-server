import React from "react";
import { Input } from "antd";
import "./index.scss";
import { TextAreaProps } from "antd/es/input";
import { JSONViewer } from "@/components/JSONViewer";

const { TextArea } = Input;

interface JSONEditorProps extends TextAreaProps {}

class JSONEditor extends React.Component<JSONEditorProps> {
  autoSize = {
    minRows: 4,
    maxRows: 4
  };

  get preJSONValue() {
    const { value } = this.props;
    let jsonValue = {};
    if (typeof value === "string") {
      try {
        jsonValue = JSON.parse(value);
      } catch (e) {}
    }
    return typeof jsonValue === "object" ? jsonValue : {};
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <div className="jsonEditorWrapper">
        <TextArea value={value} onChange={onChange} autoSize={this.autoSize} />
        <JSONViewer src={this.preJSONValue} />
      </div>
    );
  }
}

export { JSONEditor };
