import { addProject } from "@/services/projects";
import {PROJECT_STORE} from "@/constants/store";

export const projects = {
  namespace: PROJECT_STORE,
  state: {},
  effects: {
    addProject
  }
};
