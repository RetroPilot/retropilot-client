import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import BootLogsTable from "./boot";
import Console from './console';
import CrashLogsTable from "./crash";
import DeviceInfo from './device';
import DrivesLogTable from "./drives";




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
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable"
  scrollButtons="auto">
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

      {

        
      }
    </div>
  );
}


