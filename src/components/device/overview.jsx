import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';



const stylezz = {
  margin: '0px 2px 0px 0px',
}

function timeSince(date) {



  var seconds = Math.floor((new Date() - date) / 1000);

  if (seconds / 86400 > 1) {
    return Math.floor(seconds / 86400) + `d`;
  } else if (seconds / 3600 > 1) {
    return Math.floor(seconds / 3600) + `h`;
  } else if (seconds / 60 > 1) {
    return Math.floor(seconds / 60) + `m`;
  } else {
    return "just now";
  }

}


export default function SignIn(props) {

  const [state, setState] = React.useState({ count: 0, last_seen: 0 });
  const device = props.device;

  // Reloads component to update X time ago
  // TODO prevent X time ago from being refreshed when the device has been
  // updated to show offline.

  useEffect(() => {
    setInterval(() => {
      setState({ ...state, count: state.count + 1 })
    }, 60 * 1000)
  });


  const deviceLastSeen = timeSince(new Date(device.last_seen));



  return (
    <div>
      <ButtonBase style={{ padding: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img src="/c3.webp" style={{ width: "100%" }} alt="device icon"/>
          </Grid>
          <Grid item xs={8} style={{ textAlign: 'left' }}>
            {/* <TextField
              defaultValue={"SuperSkoda"}
              size="small"
              variant="standard"
              InputProps={{
                disableUnderline: false,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      size="small"
                    >
                      <Done fontSize="inherit" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              fullWidth


            />*/}
            <Typography variant="body2" align={"left"} gutterBottom>Dongle: {device.dongle_id}</Typography>

            <div>

              {device.online ?
                <Chip style={{ background: '#004d40', ...stylezz }} label="Online" size="small" variant="outlined" /> :
                <Chip style={{ background: '#b71c1c', ...stylezz }} label={`Offline ${deviceLastSeen}`} size="small" variant="outlined" />
              }

              <Chip style={{ background: '#004d40', ...stylezz }} label="Active" size="small" variant="outlined" />
            </div>
          </Grid>
        </Grid>
      </ButtonBase>
      <Divider />
    </div>

  );
}


