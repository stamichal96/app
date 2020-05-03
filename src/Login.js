
import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, createMuiTheme } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  appBarClr: {
    color: '#fff',
    backgroundColor: '#323335'
  },


  menuButton: {
    marginRight: theme.spacing(2),
  },

  formControl: {
    width: '25%'
  }


}));

function Login(props) {
  let emailRef = React.createRef();
  let passwordRef = React.createRef();

  const classes = useStyles(darkTheme);
  const history = useHistory();


  const handleLogin = async (event) => {
    const credential = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const headers = {
      "Content-Type": "application/json", //If your header name has spaces or any other char not
      Accept: "application/json",
      tenant: "uitest",
      withCredentials: true,
    };
    if (emailRef.current.value && passwordRef.current.value) {
      console.log(emailRef.current.value, passwordRef.current.value)
      try {
        await axios.post(`https://api.esch.pl/api/auth/login`, JSON.stringify(credential), { headers: headers });
        localStorage.setItem('loggedIn', 'true');
        props.onAuthorized(true);
        history.push("/course");
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Username or password is incorrect',
          title: 'Opps',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Username or password is empty',
        title: 'Opps',
      })
    }
  }


  return (

    <div className={classes.root} style={{ marginTop: '1rem' }}>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"        >

        <FormControl className={classes.formControl}>
          <TextField style={{ height: '45px' }}
            inputRef={emailRef}
            InputLabelProps={{
              shrink: true,
            }}
            label="enter email"
            required
            id="name"
          />

        </FormControl>
      </Grid>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center">
        <FormControl className={classes.formControl}>
          <TextField style={{ height: '45px' }}
            inputRef={passwordRef}
            InputLabelProps={{
              shrink: true,
            }}
            label="enter password"
            required
            id="name"
          />
        </FormControl>
      </Grid>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center" >
        <div className={classes.paddingLeft}>

          <Button onClick={handleLogin} variant="outlined" color="primary">Login</Button></div>
      </Grid>
    </div>
  );
}
export default Login;

