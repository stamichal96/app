import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  loginButton: {
    position:'absolute',
    left:'1000px'
  },
  title: {
    flexGrow: 1,
  },
}))
export default (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));
   const logout=(event)=>{
    history.push("/");
    setLoggedIn('false');
    localStorage.setItem("loggedIn",'false');
  }
  const isLogged=loggedIn==='true'||props.loggedIn
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="subtitle1"  noWrap>
          Course Management
        </Typography>
       {isLogged && <Button color="inherit"onClick={logout} className={classes.loginButton} >Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};
