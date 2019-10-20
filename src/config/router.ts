import React from "react";
import { Manage } from "@/pages/Manage";
import { Description } from "@/pages/Description";

interface Route {
  path: string;
  redirect?: string;
  component?: React.ElementType;
  menuText?: string;
  title?: string;
}
type RouteList = Array<Route>;

export const routeList: RouteList = [
  {
    path: "/",
    redirect: "/manage"
  },
  {
    path: "/manage",
    component: Manage,
    menuText: "项目",
    title: "全部项目"
  },
  {
    path: "/description",
    component: Description,
    menuText: "说明",
    title: "说明"
  }
];
