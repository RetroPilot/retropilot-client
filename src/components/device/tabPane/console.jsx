
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React, {  } from 'react';
//import { JsonFormatter } from 'react-json-formatter'

/*
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
*/

/*
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
      <img src={`data:image/gif;base64,${content.data.return.result.jpegBack}`} alt="athena road"/>
      <img src={`data:image/gif;base64,${content.data.return.result.jpegFront}`} alt="athena DM"/>
      </AccordionDetails>
    </Accordion>
      )


  } else {

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
          {<JsonFormatter json={JSON.stringify(localStorage.getItem(`ATH-${key}`))} tabWith='4' JsonStyle={JsonStyle} />}
        </AccordionDetails>
      </Accordion>
    )
  } 
} 
*/


export default function Console() {


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

