import React, { useState, useContext, useEffect } from 'react';
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
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Done from '@mui/icons-material/Done';
import ButtonBase from '@mui/material/ButtonBase'

import Divider from '@mui/material/Divider';


const stylezz = {
  margin: '0px 2px 0px 0px',
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  } 
  return Math.floor(seconds) + "s";
}
var aDay = 24*60*60*1000;
console.log(timeSince(new Date(Date.now()-aDay)));
console.log(timeSince(new Date(Date.now()-aDay*2)));

export default function SignIn(props) {

  const [state, setState] = React.useState({count: 0, last_seen: 0});
  const device = props.device;

  // Reloads component to update X time ago
  // TODO prevent X time ago from being refreshed when the device has been
  // updated to show offline.

  useEffect(() => {
    setInterval(() => {
      setState({...state, count: state.count+1})
    }, 5000)});




  return (
    <div>
      <ButtonBase style={{ padding: '10px'}}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <img src="/c3.webp" style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={8}>
            {/* <TextField
              defaultValue={"SuperSkoda"}
              size="small"
              variant="standard"
              InputProps={{
                disableUnderline: false,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      size="small"
                    >
                      <Done fontSize="inherit" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              fullWidth


            />*/}
            <Typography variant="body2" gutterBottom>{device.dongle_id}</Typography>

            <Typography variant="body2" gutterBottom>Last Seen: {timeSince(new Date(device.last_seen))} ago</Typography>
            <div>

              {device.online ? 
                <Chip style={{ background: '#004d40', ...stylezz }} label="Online" size="small" variant="outlined" /> : 
                <Chip style={{ background: '#b71c1c', ...stylezz }} label="Offline" size="small" variant="outlined" />
              }
              
                           
              <Chip style={{ background: '#dcedc8', ...stylezz }} label="Uploads Enabled" size="small" variant="outlined" />
              
            </div>
          </Grid>
        </Grid>
      </ButtonBase>
      <Divider  />
      </div>

  );
}


