enum ProjectRouteMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete"
}
export interface ProjectRoute {
  name: string;
  method: ProjectRouteMethod;
  path: string;
  mockResponse: string;
}
export interface Project {
  id: string;
  name: string;
  url: string;
  routes: Array<ProjectRoute>;
}
export type ProjectsArray = Array<Project>;
