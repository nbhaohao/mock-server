import { requestAddProject } from "@/services/projects";

export const projects = {
  namespace: "projects",
  state: {},
  effects: {
    addNewProject: () => {
      return requestAddProject();
    }
  }
};
