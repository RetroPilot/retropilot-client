import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Skeleton from "@mui/material/Skeleton";
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { context as DeviceContext } from "./../../../context/devices";
import { context as SnackbarContext } from "./../../../context/toast";
import * as helpers from "./../../../controllers/helpers"








export default function SignIn(props) {

  const [state] = useContext(DeviceContext)
  const [notifState, notifdispatch] = useContext(SnackbarContext)

  function pubKeyClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(function () {
      notifdispatch({
        type: "NEW_TOAST",
        open: true,
        msg: "Successfully copied to clipboard!"
      })
    }, function () {
      notifdispatch({
        type: "NEW_TOAST",
        open: true,
        msg: "Failed to write to clipboard!"
      })
    });
  }


  if (!state.dongles[props.dongleId]) { return (<p>no</p>) }
  const dongle = state.dongles[props.dongleId];


  if (!dongle) {
    return (
      <Grid container>
        <Grid item xs={3}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Grid>

      </Grid>

    )
  }

  return (
    <div className="wrapper" style={{ marginTop: '10px' }}>
      <Typography variant="body1">{state.dongles[props.dongleId].dongle_id}</Typography>

      <Grid container>
        <Grid item xs={3}>


          <b>Nickname:</b> {dongle.nick_name ? dongle.nick_name : `My ${dongle.device_type}`}<br></br>
          <b>Type:</b> {dongle.device_type}<br></br>
          <b>Serial:</b> {dongle.serial}<br></br>
          <b>IMEI:</b> {dongle.imei}<br></br>
          <b>Registered:</b> {helpers.formatDate(dongle.created)}<br></br>
          <b>Last Ping:</b> {helpers.formatDate(dongle.last_ping)}<br></br>
          <b>Public Key:</b> -----BEGIN PUBLIC KEY-----
          <Tooltip title="Copy public key">
            <IconButton onClick={() => pubKeyClipboard(dongle.public_key)}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <br></br>


          <b>Quota Storage: </b>{dongle.storage_used} MB / 200000 MB
        </Grid>


      </Grid>
    </div>
  );
}


