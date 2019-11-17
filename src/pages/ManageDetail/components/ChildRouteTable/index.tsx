import React from "react";
import { Table, Popover } from "antd";
import { ProjectRoute } from "@/services/projects";
import { JSONViewer } from "@/components/JSONViewer";
interface ChildRouteTableProps {
  dataArray: Array<ProjectRoute>;
}

const tableColumns = [
  {
    dataIndex: "name",
    title: "路由名称"
  },
  {
    dataIndex: "method",
    title: "请求方法"
  },
  {
    dataIndex: "path",
    title: "请求路径"
  },
  {
    dataIndex: "mockResponse",
    title: "mock数据",
    render: (value: string) => {
      let jsonObject = {};
      try {
        jsonObject = JSON.parse(value);
      } catch (e) {}
      return (
        <Popover content={<JSONViewer src={jsonObject} />}>
          <a>预览</a>
        </Popover>
      );
    }
  }
];

const ChildRouteTable: React.FC<ChildRouteTableProps> = ({ dataArray }) => {
  return (
    <Table
      bordered
      columns={tableColumns}
      dataSource={dataArray}
      rowKey={record => `${record.path}-${record.method}`}
    />
  );
};

export { ChildRouteTable };
