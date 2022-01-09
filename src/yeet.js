import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from './context/users';

const theme = createTheme();

export default function SignIn() {
  const [state, dispatch] = useContext(UserContext);

  return (
    <ThemeProvider theme={theme}>
      {console.log('testing', state)}
      <p>
        {' '}
        {JSON.stringify(state)}
      </p>

    </ThemeProvider>
  );
}
