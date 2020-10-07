import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gitHubButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Link
            href="https://github.com/dlenington/calculator2"
            color="inherit"
          >
            <IconButton className={classes.gitHubButton} color="inherit">
              <GitHubIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Calculator
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
