import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';

import { ACTIONS, ToastContext } from '../../context/toast';

function Toast() {
  const [state, dispatch] = useContext(ToastContext);

  const handleClose = () => {
    dispatch({ type: ACTIONS.CLOSE_TOAST });
  };

  return (
    <Snackbar
      open={state.open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={state.msg}
      severity="success"
    />
  );
}

export default Toast;
