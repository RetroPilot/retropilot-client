import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//import { JsonFormatter } from 'react-json-formatter'
import { context as DeviceContext } from "./../../../context/devices"


const JsonStyle = {
  propertyStyle: { color: 'red' },
  stringStyle: { color: 'green' },
  numberStyle: { color: 'darkorange' }
}

function RichContent(props) {

  const content = props.content;
  const key = props.key1;


  if (false == true && content.data.return.hasOwnProperty('result') && content.data.return.result.hasOwnProperty('jpegBack')) {

    return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{`Picture - ${key}`} </Typography>
      </AccordionSummary>
      <AccordionDetails>
      <img src={`data:image/gif;base64,${content.data.return.result.jpegBack}`} />
      <img src={`data:image/gif;base64,${content.data.return.result.jpegFront}`} />
      </AccordionDetails>
    </Accordion>
      )


  } else {
    console.log("props:", props)
    console.log("key:",key)
    console.log( "ls", localStorage.getItem(`ATH-${key}`))
    console.log("content:", content);
    return (
      <Accordion TransitionProps={{ unmountOnExit: true }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{`${content} - ${key}`} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/*<JsonFormatter json={JSON.stringify(localStorage.getItem(`ATH-${key}`))} tabWith='4' JsonStyle={JsonStyle} />*/}
        </AccordionDetails>
      </Accordion>
    )
  } 




 


}


export default function Console() {

  const [state, dispatch] = useContext(DeviceContext);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>

        {/*
          Object.keys(state).map(key => {
            console.log(key, state[key])
            return (<RichContent content={state[key]} key1={key} />)
          }
            
          )
        */}



      </Paper>
    </Box>
  );
}

