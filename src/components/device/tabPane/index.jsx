import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import BootLogsTable from './boot';
import ConsoleTable from './console';
import CrashLogsTable from './crash';
import DeviceInfo from './device';
import DrivesLogTable from './drives';

function TabPanel(props) {
  const {
    children,
    value,
    index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <div style={{ padding: '5px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPane(props) {
  const { dongleId } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="wrapper">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Device" />
          <Tab label="Drives" />
          <Tab label="Crashes" />
          <Tab label="Boot" />
          <Tab label="Console" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DeviceInfo dongleId={dongleId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DrivesLogTable dongleId={dongleId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CrashLogsTable dongleId={dongleId} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BootLogsTable dongleId={dongleId} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ConsoleTable dongleId={dongleId} />
      </TabPanel>
    </div>
  );
}

TabPane.propTypes = {
  dongleId: PropTypes.string.isRequired,
};

export default TabPane;
