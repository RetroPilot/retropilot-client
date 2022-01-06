import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Scrollbars } from 'rc-scrollbars';
import React, { useContext } from 'react';
import { context as DeviceContext } from "./../../context/devices";
import DeviceData from './../device/deviceData';
import DeviceOverview from "./../device/overview";





 
export default function SignIn() {



  const [deviceState] = useContext(DeviceContext);



  return (
    <div className="wrapper">

      <Grid container spacing={0} style={{ height: '100%', justify: 'space-around', minHeight: "100%", maxHeight: "100%" }} >
        <Grid item xs={12} md={4} lg={3} sm={6} xl={2} style={{ minHeight: "100%", maxHeight: "100%" }}>
          <Paper style={{ minHeight: "100%", maxHeight: "100%", margin: "0" }}>
            <Scrollbars autoHeight={true} autoHeightMin="calc(100vh - 14px)" audoHeightMax="calc(100% - 14px)">
              <div style={{ padding: '5px' }}>
                { deviceState ? Object.keys(deviceState.dongles).map(key => <DeviceOverview device={deviceState.dongles[key]}/>) : <p>no</p> }
                

              </div>

            </Scrollbars>




          </Paper>

        </Grid>
        <Grid item xs={12} md={8} lg={9} sm={6} xl={10}>
         { deviceState.dongles['53331425'] ? <DeviceData device={deviceState.dongles['53331425']} /> : <p>no</p> }

          
        </Grid>
      </Grid>
    </div>
  );
}


