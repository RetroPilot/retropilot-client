import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { DevicesContext } from '../../../context/devices';
import { ACTIONS as ToastActions, ToastContext } from '../../../context/toast';
import * as helpers from '../../../controllers/helpers';

function DeviceInfo(props) {
  const { dongleId } = props;

  const [devicesState] = useContext(DevicesContext);
  const [, toastDispatch] = useContext(ToastContext);

  if (!devicesState.dongles[dongleId]) {
    return (<p>no</p>);
  }

  function pubKeyClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(() => {
      toastDispatch({
        type: ToastActions.NEW_TOAST,
        open: true,
        msg: 'Successfully copied to clipboard!',
      });
    }, () => {
      toastDispatch({
        type: ToastActions.NEW_TOAST,
        open: true,
        msg: 'Failed to write to clipboard!',
      });
    });
  }

  const dongle = devicesState.dongles[dongleId];
  if (!dongle) {
    return (
      <Grid container>
        <Grid item xs={3}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Grid>
      </Grid>
    );
  }

  return (
    <div className="wrapper" style={{ marginTop: '10px' }}>
      <Typography variant="body1">{devicesState.dongles[dongleId].dongle_id}</Typography>

      <Grid container>
        <Grid item xs={3}>

          <b>Nickname:</b>
          {' '}
          {dongle.nick_name ? dongle.nick_name : `My ${dongle.device_type}`}
          <br />
          <b>Type:</b>
          {' '}
          {dongle.device_type}
          <br />
          <b>Serial:</b>
          {' '}
          {dongle.serial}
          <br />
          <b>IMEI:</b>
          {' '}
          {dongle.imei}
          <br />
          <b>Registered:</b>
          {' '}
          {helpers.formatDate(dongle.created)}
          <br />
          <b>Last Ping:</b>
          {' '}
          {helpers.formatDate(dongle.last_ping)}
          <br />
          <b>Public Key:</b>
          {' '}
          -----BEGIN PUBLIC KEY-----
          <Tooltip title="Copy public key">
            <IconButton onClick={() => pubKeyClipboard(dongle.public_key)}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <br />

          <b>Quota Storage: </b>
          {dongle.storage_used}
          {' '}
          MB / 200000 MB
        </Grid>

      </Grid>
    </div>
  );
}

DeviceInfo.propTypes = {
  dongleId: PropTypes.string.isRequired,
};

export default DeviceInfo;
