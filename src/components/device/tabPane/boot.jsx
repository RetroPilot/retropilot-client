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
import * as helpers from "./../../../controllers/helpers"


function loading() {
    return (
      <TableRow>
        <TableCell ><Skeleton animation="wave" /></TableCell>
        <TableCell ><Skeleton animation="wave" /></TableCell>
        <TableCell ><Skeleton animation="wave" /></TableCell>
        <TableCell ><Skeleton animation="wave" /></TableCell>
      </TableRow>
    )
  }


export default function EnhancedTable(props) {
  const [state, dispatch] = useContext(DeviceContext)

  const [, notifDispatch] = useContext(SnackbarContext)

  useEffect(() => {
    deviceController.getBootlogs(props.dongleId).then((res) => {
      setTimeout(() => {
        dispatch({ type: "update_dongle_bootlogs", dongle_id: props.dongleId, bootlogs: res.data })
      }, 1)
    }).catch(() => {
      notifDispatch({type: "NEW_TOAST", msg: 'Failed to load bootlogs'})
    })

  }, [dispatch, notifDispatch, props.dongleId])

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
                <TableCell >Date</TableCell>
                <TableCell >File</TableCell>
                <TableCell >File size</TableCell>
                <TableCell >Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {state.dongles[props.dongleId].boot ? state.dongles[props.dongleId].boot.map((row) => {
                return (
                  <TableRow hover>
                    <TableCell >{helpers.formatDate(row.date)}</TableCell>
                    <TableCell >{row.name}</TableCell>
                    <TableCell >{Math.round(row.size / 1024) + ' MiB'}</TableCell>
                    <TableCell>
                    <Tooltip title="Open in new window">

                      <IconButton size="small" onClick={() => window.open(row.permalink, "_blank")}>
                        <OpenInNewIcon fontSize="inherit"/>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Preserve">
                      <IconButton size="small">
                        <FavoriteBorderIcon fontSize="inherit"/>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton size="small">
                        <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                    </Tooltip>

                    </TableCell>
                  </TableRow>
                )

              }) : [1, 1, 1, 1, 1].map(loading) }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

