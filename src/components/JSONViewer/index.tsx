import React from "react";
import ReactJson, { ReactJsonViewProps } from "react-json-view";
import "./index.scss";

interface JSONViewer extends ReactJsonViewProps {}

const JSONViewer: React.FC<JSONViewer> = ({ src }) => {
  return (
    <div className="json-viewer-component">
      <ReactJson src={src} name={null} displayDataTypes={false} />
    </div>
  );
};

export { JSONViewer };
