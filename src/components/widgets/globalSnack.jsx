import Snackbar from '@mui/material/Snackbar';
import React, { useContext } from 'react';
import { context as DeviceContext } from "./../../context/toast";






export default function Toast(props) {
  const [ state, dispatch ] = useContext(DeviceContext)
  
 

  const handleClose = () => {
    dispatch({type: 'CLOSE_TOAST'})
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
 