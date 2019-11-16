import { Dispatch } from "react";
import { ActionType } from "@/store";

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    [key: string]: (
      payload: any,
      stateProps: {
        state: any;
        rootState: any;
        dispatch: Dispatch<ActionType>;
      }
    ) => any;
  };
  reducers?: {
    [key: string]: (state: any, payload?: any) => any;
  };
}
