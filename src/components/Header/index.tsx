import React, { useState, useCallback } from "react";
import {
  AppBar,
  Theme,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuDrawer } from "./components/MenuDrawer";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import "./index.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      fontFamily: "ChannelSlanted2"
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
);

const useMenu = () => {
  const [menuVisible, changeMenuVisible] = useState(false);

  const showMenu = useCallback(() => {
    changeMenuVisible(true);
  }, [changeMenuVisible]);

  const hiddenMenu = useCallback(() => {
    changeMenuVisible(false);
  }, [changeMenuVisible]);

  return { menuVisible, showMenu, hiddenMenu };
};

const Header: React.FC = () => {
  const classes = useStyles();

  const { menuVisible, showMenu, hiddenMenu } = useMenu();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={showMenu}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Mock Server
          </Typography>
        </Toolbar>
      </AppBar>
      <MenuDrawer open={menuVisible} onClose={hiddenMenu} />
    </div>
  );
};

export { Header };
