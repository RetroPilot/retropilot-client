import React, { useEffect, useState, useContext } from 'react';
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
import {context as DeviceContext} from "./../../context/devices"
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Done from '@mui/icons-material/Done';
import DrivesTable from './tabPane';

import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles } from '@mui/styles';
import GoogleMapReact from 'google-map-react';
import axios from "axios"

import {context as SnackbarContext} from "./../../context/toast"

const useStyles = makeStyles({
  controlsButton: {
    margin: "0 3px"
  }
});



function DeviceControls() {
  const classes = useStyles();
  const [ state, dispatch ] = useContext(DeviceContext);

  const [ notifState, notifdispatch ] = useContext(SnackbarContext)



  async function refreshDongleStatus() {
  }

  async function athenaReboot() {
    
  }

  return (

    <div style={{ padding: '10px' }}>
      <Typography className={classes.controlsButton} style={{display: 'inline'}} variant="h6">c8321a</Typography>
      <LoadingButton className={classes.controlsButton} size="small" loadingIndicator="Loading..." variant="contained">
        Unpair
      </LoadingButton>

      <LoadingButton className={classes.controlsButton} size="small" loadingIndicator="Loading..." variant="contained">
        Ping
      </LoadingButton>

      <LoadingButton className={classes.controlsButton} size="small" loadingIndicator="Loading..." variant="contained" onClick={athenaReboot}>
        Reboot
      </LoadingButton>

      <LoadingButton className={classes.controlsButton} size="small" loadingIndicator="Loading..." variant="contained" onClick={()=>{notifdispatch({type: 'NEW_TOAST', message: 'TIDDY', open: true})}}>
        Get GPS
      </LoadingButton>

      <LoadingButton className={classes.controlsButton} size="small" loadingIndicator="Loading..." variant="contained" onClick={refreshDongleStatus}>
        Refresh
      </LoadingButton>

    </div>

  )
}

function DeviceLastSeenMap() {
  console.log("api key", process.env)
  return (
    <div style={{ height: "500px", width: 'calc(100%)' }}>

              <GoogleMapReact
                height="100px"
                bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API_KEY }}
                defaultCenter={{
                  lat: 51.501134,
                  lng: -0.142318
                }}
                defaultZoom={17}
                options={{ 
                  styles: [
                    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                    {
                      featureType: "administrative.locality",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#d59563" }], 
                    },
                    {
                      featureType: "poi",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#d59563" }],
                    },
                    {
                      featureType: "poi.park",
                      elementType: "geometry",
                      stylers: [{ color: "#263c3f" }],
                    },
                    {
                      featureType: "poi.park",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#6b9a76" }],
                    },
                    {
                      featureType: "road",
                      elementType: "geometry",
                      stylers: [{ color: "#38414e" }],
                    },
                    {
                      featureType: "road",
                      elementType: "geometry.stroke",
                      stylers: [{ color: "#212a37" }],
                    },
                    {
                      featureType: "road",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#9ca5b3" }],
                    },
                    {
                      featureType: "road.highway",
                      elementType: "geometry",
                      stylers: [{ color: "#746855" }],
                    },
                    {
                      featureType: "road.highway",
                      elementType: "geometry.stroke",
                      stylers: [{ color: "#1f2835" }],
                    },
                    {
                      featureType: "road.highway",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#f3d19c" }],
                    },
                    {
                      featureType: "transit",
                      elementType: "geometry",
                      stylers: [{ color: "#2f3948" }],
                    },
                    {
                      featureType: "transit.station",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#d59563" }],
                    },
                    {
                      featureType: "water",
                      elementType: "geometry",
                      stylers: [{ color: "#17263c" }],
                    },
                    {
                      featureType: "water",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#515c6d" }],
                    },
                    {
                      featureType: "water",
                      elementType: "labels.text.stroke",
                      stylers: [{ color: "#17263c" }],
                    },
                  ],
                }}
              />
            </div>
  )
}


export default function SignIn(props) {
  const classes = useStyles();
  const [ state, dispatch ] = useContext(DeviceContext)




  return (
    <div style={{
      height: "100%",
      width: "100%",
    }}>


      <Scrollbars autoHeightMin="100%" autoHeightMax="100%">

        <Grid container style={{padding: 30}}>


         

          <Grid item xs={12}>
            <DeviceLastSeenMap />
          </Grid>


          <Grid item xs={12}>
            <DrivesTable dongleId={props.device.dongle_id}/>
          </Grid>

        </Grid>
      </Scrollbars>

    </div>

  );
}


