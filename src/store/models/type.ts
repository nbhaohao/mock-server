export interface ModelType {
  namespace: string;
  state: {};
  effects?: {
    [key: string]: (payload?: any) => any;
  };
}
