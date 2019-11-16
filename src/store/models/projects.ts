import {
  addProject,
  getProjectsData,
  Project,
  SAVE_PROJECTS
} from "@/services/projects";
import { PROJECT_STORE } from "@/constants/store";
import { ModelType } from "@/store/models/type";

interface ProjectsState {
  projects: Array<Project>;
}

export const projects: ModelType = {
  namespace: PROJECT_STORE,
  state: {
    projects: []
  },
  effects: {
    addProject,
    async getProjects(_, { dispatch }) {
      const projectsRes = await getProjectsData();
      dispatch({
        type: SAVE_PROJECTS,
        payload: projectsRes.result
      });
    }
  },
  reducers: {
    updateProjects(state: ProjectsState, payload: Array<Project>) {
      return {
        ...state,
        projects: payload
      };
    }
  }
};
