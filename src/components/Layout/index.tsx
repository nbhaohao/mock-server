import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";
import { Header } from "@/components/Header";
import "./index.scss";
import { Content } from "@/components/Content";

const Layout: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      primary: blue
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="layout-component">
          <Header />
          <Content />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export { Layout };
