import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { Layout } from "@/components/Layout";
import { BrowserRouter as Router } from "react-router-dom";
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
    <Router>
      <ConfigProvider locale={zhCN}>
        <EffectContext.Provider value={effect}>
          <DispatchContext.Provider value={dispatch}>
            <StoreContext.Provider value={store}>
              <Layout />
            </StoreContext.Provider>
          </DispatchContext.Provider>
        </EffectContext.Provider>
      </ConfigProvider>
    </Router>
  );
};

export default App;
