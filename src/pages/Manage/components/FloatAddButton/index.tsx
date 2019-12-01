import React from "react";
import "./index.scss";
import { Button, Icon } from "antd";
interface FloatAddButtonProps {
  onClick: () => void;
}

const FloatAddButton: React.FC<FloatAddButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      type="primary"
      shape="circle"
      size="large"
      className="float-add-button-component"
    >
      <Icon type="plus" />
    </Button>
  );
};

export { FloatAddButton };
