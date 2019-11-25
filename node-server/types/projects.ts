import { Project } from "./db";

export interface addProjectBody extends Project {}
export interface deleteProjectBody {
  id: string;
}
