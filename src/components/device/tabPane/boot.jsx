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

function BootLogsTable(props) {
  const { dongleId } = props;

  const [state, devicesDispatch] = useContext(DevicesContext);
  const [, toastDispatch] = useContext(ToastContext);

  useEffect(() => {
    deviceController.getBootlogs(dongleId).then((res) => {
      // TODO: why set timeout 1?
      setTimeout(() => {
        devicesDispatch({
          type: DevicesActions.UPDATE_DONGLE_BOOTLOGS,
          dongle_id: dongleId,
          bootlogs: res.data,
        });
      }, 1);
    }).catch(() => {
      toastDispatch({
        type: ToastActions.NEW_TOAST,
        msg: 'Failed to load bootlogs',
      });
    });
  }, [devicesDispatch, toastDispatch, dongleId]);

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
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {state.dongles[dongleId].boot ? state.dongles[dongleId].boot.map((row) => (
                // TODO: extract to function
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
              )) : [1, 1, 1, 1, 1].map(loading) }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

BootLogsTable.propTypes = {
  dongleId: PropTypes.string.isRequired,
};

export default BootLogsTable;
