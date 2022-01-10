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

import { ACTIONS, DevicesContext } from '../../../context/devices';
import * as deviceController from '../../../controllers/devices';
import * as helpers from '../../../controllers/helpers';

function buildContent(row) {
  return (
    <TableRow hover>
      <TableCell>{helpers.formatDate(row.date)}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{`${Math.round(row.size / 1024)} MiB`}</TableCell>

      <TableCell>
        <Tooltip title="Open in new window">
          <IconButton size="small" onClick={() => window.open(row.permalink, '_blank')}>
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

function CrashLogsTable(props) {
  const { dongleId } = props;

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(DevicesContext);
  useEffect(() => {
    deviceController.getCrashlogs(dongleId).then((res) => {
      dispatch({
        type: ACTIONS.UPDATE_DONGLE_BOOTLOGS,
        dongle_id: dongleId,
        bootlogs: res.data,
      });
    });
  }, [dispatch, dongleId]);

  console.log('drives', state.dongles[dongleId]);
  console.log('drives', typeof state.dongles[dongleId]);

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
              {state.dongles[dongleId].crash
                ? (state.dongles[dongleId].crash.length > 0
                  ? state.dongles[dongleId].crash.map(buildContent)
                  : <p> No drives </p>)
                : [1, 1, 1, 1, 1].map(loading)}
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
