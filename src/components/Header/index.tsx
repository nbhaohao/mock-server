import React from "react";
import "./index.scss";
import { HEADER_TEXT } from "@/constants/global";

const Header: React.FC = () => {
  return (
    <div className="header-component">
      <h2 className="header-text">{HEADER_TEXT}</h2>
    </div>
  );
};

export { Header };
