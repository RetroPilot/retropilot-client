import logo from './logo.svg';
import React, { useEffect, useState, useContext } from 'react';

import Login from "./components/views/login"
import Home from "./components/views/home"
import UserAdmin from "./components/views/useradmin"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { UserProvider, UserContext } from "./context/users"
import DeviceStore from "./context/devices"
import ToastStore from "./context/toast"
import GlobalSnack from './components/widgets/globalSnack'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


// Connection opened




function App() {


  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: true ? 'dark' : 'light',
        },
      }),
    [true],
  );

  return (
    <div className="App">

<ThemeProvider theme={theme}>
      <CssBaseline />
      
      <UserProvider>
        <DeviceStore>
          <ToastStore>

        <GlobalSnack />

          <UserAdmin />

          </ToastStore>
        </DeviceStore>

      </UserProvider>
      </ThemeProvider>



    </div>
  );
}

export default App;
