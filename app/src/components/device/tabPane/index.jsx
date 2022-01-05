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
import DeviceInfo from './device'
import Console from './console'


const theme = createTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ padding: '5px' }}>
          {children}
        </div>
      )}
    </div>
  );
}



export default function SignIn(props) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="wrapper">

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Device" />
          <Tab label="Drives" />
          <Tab label="Crashes" />
          <Tab label="Boot" />
          <Tab label="Console" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DeviceInfo dongleId={props.dongleId}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DrivesLogTable dongleId={props.dongleId}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CrashLogsTable dongleId={props.dongleId}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BootLogsTable dongleId={props.dongleId}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Console dongleId={props.dongleId} />
      </TabPanel>
    </div>
  );
}


