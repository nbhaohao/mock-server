import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { Layout } from "@/components/Layout";
import {
  useStore,
  initialState,
  InitialStateType,
  DispatchType,
  EffectType
} from "@/store";
import "./styles/index.scss";

export const StoreContext = React.createContext<InitialStateType>(initialState);
export const DispatchContext = React.createContext<DispatchType>(() => {});
export const EffectContext = React.createContext<EffectType>(() => {});

const App: React.FC = () => {
  const [store, dispatch, effect] = useStore();
  return (
    <ConfigProvider locale={zhCN}>
      <StoreContext.Provider value={store}>
        <DispatchContext.Provider value={dispatch}>
          <EffectContext.Provider value={effect}>
            <Layout />
          </EffectContext.Provider>
        </DispatchContext.Provider>
      </StoreContext.Provider>
    </ConfigProvider>
  );
};

export default App;
