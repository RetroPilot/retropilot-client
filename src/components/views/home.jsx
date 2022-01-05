import React, {useState, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from "./../../context/users"
import { Link } from "react-router-dom";

const theme = createTheme(); 

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [ state, dispatch ] = useContext(UserContext)
  console.log("component", state)
  const handleSubmit = (event) => {
    dispatch({ type: "toggle_button" })

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    setLoading(true)


  };

  return (
    <ThemeProvider theme={theme}>
        <p>hello</p>
        <Link to="/login" variant="body2">
                  {"login?"}
                </Link>   
    </ThemeProvider>
  );
}


