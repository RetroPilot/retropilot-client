import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { ACTIONS as DevicesActions, DevicesContext } from '../../../context/devices';
import { ACTIONS as ToastActions, ToastContext } from '../../../context/toast';
import * as deviceController from '../../../controllers/devices';
import * as helpers from '../../../controllers/helpers';

function buildRow(crash) {
  return (
    <TableRow hover>
      <TableCell>{helpers.formatDate(crash.date)}</TableCell>
      <TableCell>{crash.name}</TableCell>
      <TableCell>{`${Math.round(crash.size / 1024)} MiB`}</TableCell>

      <TableCell>
        <Tooltip title="Open in new window">
          <IconButton size="small" onClick={() => window.open(crash.permalink, '_blank')}>
            <OpenInNewIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Preserve">
          <IconButton size="small">
            <FavoriteBorderIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton size="small">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

function loading() {
  return (
    <TableRow>
      <TableCell><Skeleton animation="wave" /></TableCell>
      <TableCell><Skeleton animation="wave" /></TableCell>
      <TableCell><Skeleton animation="wave" /></TableCell>
      <TableCell><Skeleton animation="wave" /></TableCell>
    </TableRow>
  );
}

function buildBody(dongle) {
  if (!dongle.crash) {
    return [1, 1, 1, 1, 1].map(loading);
  }
  if (dongle.crash.length === 0) {
    return <p>No drives</p>;
  }
  return dongle.crash.map(buildRow);
}

function CrashLogsTable(props) {
  const { dongleId } = props;

  const [state, devicesDispatch] = useContext(DevicesContext);
  const [, toastDispatch] = useContext(ToastContext);
  useEffect(() => {
    deviceController.getCrashlogs(dongleId).then((res) => {
      devicesDispatch({
        type: DevicesActions.UPDATE_DONGLE_CRASHLOGS,
        dongle_id: dongleId,
        crashlogs: res.data,
      });
    }).catch(() => {
      toastDispatch({
        type: ToastActions.NEW_TOAST,
        msg: 'Failed to load crashlogs',
      });
    });
  }, [devicesDispatch, toastDispatch, dongleId]);

  const dongle = state.dongles[dongleId];
  console.log('drives', dongle);
  console.log('drives', typeof dongle);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>File</TableCell>
                <TableCell>File size</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {buildBody(dongle)}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

CrashLogsTable.propTypes = {
  dongleId: PropTypes.string.isRequired,
};

export default CrashLogsTable;
