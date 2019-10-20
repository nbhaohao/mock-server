import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "@/components/Header";
import "./index.scss";
import { Content } from "@/components/Content";

const Layout: React.FC = () => {
  return (
    <Router>
      <div className="layout-component">
        <Header />
        <Content />
      </div>
    </Router>
  );
};

export { Layout };
