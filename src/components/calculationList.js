import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

function CalculationList(props) {
  const calculations = [];

  return (
    <List>
      {calculations.map((calculation) => (
        <div>
          <ListItem>
            <ListItemText primary={calculation.value} />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}

export default CalculationList();
