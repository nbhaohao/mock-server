import React, { useCallback } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { routeList } from "@/config/router";
import { useHistory } from "react-router";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleMenuClick = useCallback(
    path => {
      history.push(path);
      onClose();
    },
    [history, onClose]
  );

  return (
    <Drawer open={open} onClose={onClose}>
      <div className={classes.list}>
        <List>
          {routeList
            .filter(route => route.menuText)
            .map(route => {
              return (
                <ListItem
                  button
                  key={route.path}
                  onClick={() => handleMenuClick(route.path)}
                >
                  {route.icon && (
                    <ListItemIcon>
                      <route.icon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={route.menuText} />
                </ListItem>
              );
            })}
        </List>
      </div>
    </Drawer>
  );
};

export { MenuDrawer };
