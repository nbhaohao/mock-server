import React, { Fragment, useCallback, useMemo } from "react";
import { Table, Popover, Divider, Switch } from "antd";
import { ProjectRoute } from "@/services/projects";
import { JSONViewer } from "@/components/JSONViewer";
import { ModalRequestDelete } from "@/utils/modalUtil";

interface ChildRouteTableProps {
  switchLoadingRoute: ProjectRoute | null;
  dataArray: Array<ProjectRoute>;
  onDeleteProjectRoute: (route: ProjectRoute) => () => Promise<void>;
  onEditProjectRoute: (route: ProjectRoute) => void;
  onChangeProjectRouteStatus: (route: ProjectRoute) => void;
}

const ChildRouteTable: React.FC<ChildRouteTableProps> = ({
  dataArray,
  onDeleteProjectRoute,
  onEditProjectRoute,
  onChangeProjectRouteStatus,
  switchLoadingRoute
}) => {
  const handleDeleteRoute = useCallback(
    (route: ProjectRoute): void => {
      ModalRequestDelete({
        title: "提示",
        content: "你确定要删除这个路由吗？",
        onOk: onDeleteProjectRoute(route)
      });
    },
    [onDeleteProjectRoute]
  );
  const handleEditRoute = useCallback(
    (route: ProjectRoute) => {
      onEditProjectRoute(route);
    },
    [onEditProjectRoute]
  );
  const handleChangeStatus = useCallback(
    ({ checked, route }) => {
      onChangeProjectRouteStatus({
        ...route,
        state: checked ? "enabled" : "disabled"
      });
    },
    [onChangeProjectRouteStatus]
  );
  const tableColumns: Array<{
    dataIndex: string;
    title: string;
    align: "center";
    render?: (...params: any) => any;
  }> = useMemo(
    () => [
      {
        dataIndex: "state",
        title: "状态",
        align: "center",
        render: (value: string, record: ProjectRoute) => {
          return (
            <Switch
              loading={
                !!(
                  switchLoadingRoute && switchLoadingRoute.name === record.name
                )
              }
              onChange={checked => {
                handleChangeStatus({ checked, route: record });
              }}
              checkedChildren="启用"
              unCheckedChildren="禁用"
              checked={value === "enabled"}
            />
          );
        }
      },
      {
        dataIndex: "name",
        title: "路由名称",
        align: "center"
      },
      {
        dataIndex: "method",
        title: "请求方法",
        align: "center"
      },
      {
        dataIndex: "path",
        title: "请求路径",
        align: "center"
      },
      {
        dataIndex: "mockResponse",
        title: "mock数据",
        align: "center",
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
      },
      {
        dataIndex: "op",
        title: "操作",
        align: "center",
        render: (value: string, record: ProjectRoute) => {
          return (
            <Fragment>
              <a
                onClick={() => {
                  handleEditRoute(record);
                }}
              >
                编辑
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  handleDeleteRoute(record);
                }}
              >
                删除
              </a>
            </Fragment>
          );
        }
      }
    ],
    [handleDeleteRoute, handleEditRoute, switchLoadingRoute, handleChangeStatus]
  );
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
