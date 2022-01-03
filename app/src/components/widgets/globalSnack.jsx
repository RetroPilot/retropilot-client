import React, { useEffect, useState, useContext } from 'react';


import {context as DeviceContext} from "./../../context/toast"


import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


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
    />
  );
}
 