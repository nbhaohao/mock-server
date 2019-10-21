import React from "react";
import "./index.scss";
import { Button } from "antd";
interface FloatAddButtonProps {
  onClick: () => void;
}

const FloatAddButton: React.FC<FloatAddButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      type="primary"
      shape="circle"
      icon="plus"
      size="large"
      className="float-add-button-component"
    />
  );
};

export { FloatAddButton };
