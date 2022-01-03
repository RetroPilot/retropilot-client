import React, { useState, useContext } from 'react';
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
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeviceData from './../device/deviceData';

import DeviceOverview from "./../device/overview"
import { Scrollbars } from 'rc-scrollbars';
import { context as DeviceContext } from "./../../context/devices"

const theme = createTheme();




export default function SignIn() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [deviceState, deviceDispatch] = useContext(DeviceContext);


  let ok = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className="wrapper">

      <Grid container spacing={0} style={{ height: '100%', justify: 'space-around', minHeight: "100%", maxHeight: "100%" }} >
        <Grid item xs={12} md={4} lg={3} sm={6} xl={2} style={{ minHeight: "100%", maxHeight: "100%" }}>
          <Paper style={{ minHeight: "100%", maxHeight: "100%", margin: "0" }}>
            <Scrollbars autoHeight={true} autoHeightMin="calc(100vh - 14px)" audoHeightMax="calc(100% - 14px)">
              <div style={{ padding: '5px' }}>
                { deviceState ? Object.keys(deviceState).map(key => <DeviceOverview device={deviceState[key]}/>) : <p>no</p> }
                

              </div>

            </Scrollbars>




          </Paper>

        </Grid>
        <Grid item xs={12} md={8} lg={9} sm={6} xl={10}>
          <DeviceData />
        </Grid>
      </Grid>
    </div>
  );
}


