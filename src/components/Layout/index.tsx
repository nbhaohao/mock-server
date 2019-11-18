import React from "react";
import { Header } from "@/components/Header";
import "./index.scss";
import { Content } from "@/components/Content";

const Layout: React.FC = () => {
  return (
      <div className="layout-component">
        <Header />
        <Content />
      </div>
  );
};

export { Layout };
