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
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import DrivesLogTable from "./drives";
import CrashLogsTable from "./crash";
import BootLogsTable from "./boot";
import { context as DeviceContext } from "./../../../context/devices"

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const theme = createTheme();
function formatDate(timestampMs) {
  return new Date(timestampMs).toISOString().replace(/T/, ' ').replace(/\..+/, '');
}



export default function SignIn(props) {

  const [value, setValue] = React.useState(0);
  const [state, dispatch] = useContext(DeviceContext)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!state.dongles[props.dongleId]) { return (<p>no</p>) }
  const dongle = state.dongles[props.dongleId];
  //   <span style={{maxWidth: "100%", overflow: "scroll", whiteSpace:"nowrap" }}> {dongle.public_key.split(/\r?\n|\r/g).map((key) => (<p style={{margin: 0}}>{key}</p>))}</span>

  return (
    <div className="wrapper" style={{ marginTop: '10px' }}>
      <Typography variant="body1">{state.dongles[props.dongleId].dongle_id}</Typography>

      <Grid container>
        <Grid item xs={3}>

          <div style={{ padding: '5px' }}>

            <h3>Device {dongle.dongle_id} </h3>
            <b>Type:</b> {dongle.device_type}<br></br>
            <b>Serial:</b> {dongle.serial}<br></br>
            <b>IMEI:</b> {dongle.imei}<br></br>
            <b>Registered:</b> {formatDate(dongle.created)}<br></br>
            <b>Last Ping:</b> {formatDate(dongle.last_ping)}<br></br>
            <b>Public Key:</b> -----BEGIN PUBLIC KEY-----
            <Tooltip title="Copy public key">
              <IconButton  onClick={() => console.log("click")}>
                <ContentCopyIcon  />
              </IconButton>
            </Tooltip>
            <br></br>


            <b>Stored Drives: </b> ` + drives.length + `<br></br>
            <b>Quota Storage: </b>{dongle.storage_used} MB / 200000 MB

 
          </div>




        </Grid>


      </Grid>
    </div>
  );
}


