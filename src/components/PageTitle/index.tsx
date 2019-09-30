import React from "react";
import "./index.scss";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="page-title-component">
      <h1>{title}</h1>
    </div>
  );
};

export { PageTitle };
