import { useReducer } from "react";
import * as _modules from "./models";
import { ModelType } from "@/store/models/type";

interface ModelsType {
  [key: string]: ModelType;
}

export interface InitialStateType {
  loading: { [key: string]: boolean };
  [key: string]: any;
}

export interface ActionType {
  type: string;
  payload?: any;
}

export interface DispatchType {
  (action: ActionType): any;
}

export interface EffectType {
  (action: ActionType): any;
}

const modules: ModelsType = _modules;
const GLOBAL_LOADING_ACTION = "CHANGE_LOADING";
const GLOBAL_UPDATE_STATE = "UPDATE_STATE";
const initialState: InitialStateType = {
  loading: {}
};

const reducer = (state: InitialStateType, action: ActionType) => {
  const { type, payload } = action;
  if (type === GLOBAL_LOADING_ACTION) {
    return {
      ...state,
      loading: {
        ...state.loading,
        ...payload
      }
    };
  }
  if (type === GLOBAL_UPDATE_STATE) {
    return {
      ...state,
      ...payload
    };
  }
  return state;
};

const refactorModuleEffects = (dispatch: DispatchType) => {
  for (const module in modules) {
    const moduleItem: ModelType = modules[module];
    initialState[moduleItem.namespace] = moduleItem.state;
    for (const effectMethod in moduleItem.effects) {
      const originMethod = moduleItem.effects[effectMethod];
      moduleItem.effects[effectMethod] = async payload => {
        dispatch({
          type: GLOBAL_LOADING_ACTION,
          payload: {
            [`${moduleItem.namespace}/${effectMethod}`]: true
          }
        });
        let response = undefined;
        if (moduleItem.effects) {
          try {
            response = await originMethod(payload, {
              state: moduleItem.state,
              dispatch,
              rootState: initialState
            });
          } catch (e) {
            dispatch({
              type: GLOBAL_LOADING_ACTION,
              payload: {
                [`${moduleItem.namespace}/${effectMethod}`]: false
              }
            });
            return Promise.reject(e);
          }
        }
        dispatch({
          type: GLOBAL_LOADING_ACTION,
          payload: {
            [`${moduleItem.namespace}/${effectMethod}`]: false
          }
        });
        return response;
      };
    }
  }
};

const useStore = (): [InitialStateType, DispatchType, EffectType] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const _dispatch = (action: ActionType) => {
    if (action.type === GLOBAL_LOADING_ACTION) {
      dispatch({
        type: GLOBAL_LOADING_ACTION,
        payload: action.payload
      });
      return;
    }
    const [namespace, actionName] = action.type.split("/");
    const moduleItem = modules[namespace];
    if (!moduleItem) {
      return;
    }
    const reducers = moduleItem.reducers;
    if (!reducers) {
      return;
    }
    const reducerMethod = reducers[actionName];
    if (!reducerMethod) {
      return;
    }
    const newNamespaceState = reducerMethod(moduleItem.state, action.payload);
    dispatch({
      type: GLOBAL_UPDATE_STATE,
      payload: {
        [namespace]: newNamespaceState
      }
    });
  };
  refactorModuleEffects(_dispatch);
  const effect = (action: ActionType) => {
    const [namespace, actionName] = action.type.split("/");
    const moduleItem = modules[namespace];
    if (!moduleItem) {
      return;
    }
    const effects = moduleItem.effects;
    if (!effects) {
      return;
    }
    const effectMethod = effects[actionName];
    if (!effectMethod) {
      return;
    }
    return effectMethod(action.payload, {
      state: moduleItem.state,
      rootState: state,
      dispatch: _dispatch
    });
  };
  return [state, _dispatch, effect];
};

export { useStore, initialState };
