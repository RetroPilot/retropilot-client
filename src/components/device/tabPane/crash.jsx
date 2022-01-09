// eslint-disable-next-line react-hooks/exhaustive-deps

import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
import React, { useContext, useEffect } from 'react';
import { context as DeviceContext } from '../../../context/devices';
import * as deviceController from '../../../controllers/devices';
import * as helpers from '../../../controllers/helpers';

function buildContent(row) {
  return (
    <TableRow
      hover
    >

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

export default function EnhancedTable(props) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(DeviceContext);
  useEffect(() => {
    deviceController.getCrashlogs(props.dongleId).then((res) => {
      dispatch({ type: 'update_dongle_bootlogs', dongle_id: props.dongleId, bootlogs: res.data });
    });
  }, [dispatch, props.dongleId]);

  console.log('drives', state.dongles[props.dongleId]);
  console.log('drives', typeof state.dongles[props.dongleId]);

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
              {state.dongles[props.dongleId].crash
                ? state.dongles[props.dongleId].crash.length > 0 ? state.dongles[props.dongleId].crash.map(buildContent) : <p> No drives </p>
                : [1, 1, 1, 1, 1].map(loading)}

            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    </Box>
  );
}
