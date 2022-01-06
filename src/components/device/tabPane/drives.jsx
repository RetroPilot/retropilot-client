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
import { context as DeviceContext } from "./../../../context/devices";
import { context as SnackbarContext } from "./../../../context/toast";
import * as deviceController from "./../../../controllers/devices";



function formatDate(timestampMs) {
  return new Date(timestampMs).toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function formatDuration(durationSeconds) {
  durationSeconds = Math.round(durationSeconds);
  const secs = durationSeconds % 60;
  let mins = Math.floor(durationSeconds / 60);
  let hours = Math.floor(mins / 60);
  mins = mins % 60;
  const days = Math.floor(hours / 24);
  hours = hours % 24;

  let response = '';
  if (days > 0) response += days + 'd ';
  if (hours > 0 || days > 0) response += hours + 'h ';
  if (hours > 0 || days > 0 || mins > 0) response += mins + 'm ';
  response += secs + 's';
  return response;
}


export default function EnhancedTable(props) {
  const [state, dispatch] = useContext(DeviceContext)
  const [ notifState, notifdispatch ] = useContext(SnackbarContext)

  useEffect(() => {
    deviceController.getDrives(props.dongleId).then((res) => {
      setTimeout(() => {
        dispatch({ type: "update_dongle_drive", dongle_id: props.dongleId, drives: res.data })
      }, 1)
    }).catch((err) => {
      notifdispatch({type: "NEW_TOAST", msg: 'Failed to load drives'})
    })

  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <TableHead>
              <TableRow>
                <TableCell>Identifier</TableCell>
                <TableCell>Car</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>File size</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Distance</TableCell>
                <TableCell>uploaded</TableCell>
                <TableCell>Processed</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {state.dongles[props.dongleId].drives ? state.dongles[props.dongleId].drives.map((row) => {
                let metadata;

                try {
                  metadata = JSON.parse(row.metadata)
                } catch (err) { metadata = {} }
                return (
                  <TableRow
                    hover
                  >
                    <TableCell
                      scope="row"
                    >{row.identifier}</TableCell>

                    <TableCell >{metadata.hasOwnProperty('CarParams1') ? metadata.CarParams['CarName'] : "Glorious Skoda"}</TableCell>
                    <TableCell >{metadata.hasOwnProperty('InitData1') ? metadata.InitData['Version'] : "Lemon boy"}</TableCell>
                    <TableCell >{Math.round(row.filesize / 1024) + ' MiB'}</TableCell>
                    <TableCell >{formatDuration(row.duration)}</TableCell>
                    <TableCell >{Math.round(row.distance_meters / 1000)}</TableCell>
                    <TableCell >{row.upload_complete.toString()}</TableCell>
                    <TableCell >{row.is_processed.toString()}</TableCell>
                    <TableCell >{formatDate(row.drive_date)}</TableCell>

                    <TableCell>
                      <Tooltip title="Open in new window">
                        <IconButton size="small">
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
                )

              }) :

                [1, 1, 1, 1, 1].map((v) => (
                  <TableRow
                  >
                    <TableCell padding="checkbox">
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell
                      scope="row"
                    >
                      <Skeleton animation="wave" />
                    </TableCell>

                    <TableCell ><Skeleton animation="wave" /></TableCell>
                    <TableCell ><Skeleton animation="wave" /></TableCell>
                    <TableCell ><Skeleton animation="wave" /></TableCell>
                    <TableCell ><Skeleton animation="wave" /></TableCell>
                    <TableCell ><Skeleton animation="wave" /></TableCell>
                    <TableCell ><Skeleton animation="wave" /></TableCell>
                    <TableCell ><Skeleton animation="wave" /></TableCell>
                    <TableCell ><Skeleton animation="wave" /></TableCell>
                  </TableRow>
                ))


              }

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

