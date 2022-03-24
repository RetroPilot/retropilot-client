import React, { useContext, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { UserContext } from '../../context/users';
import { login } from '../../api/auth';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  console.log('component', state);

  const handleSubmit = async (event) => {
    dispatch({ type: 'toggle_button' });

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get('email'), data.get('password'))
      .then((result) => console.log('result', result))
      .catch(console.error);

    setLoading(true);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ height: '100vh' }}>
      <Grid container direction="row" justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            style={{
              padding: '15px',
            }}
          >

            <Typography component="h1" variant="h5" align="left">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Sign In
              </LoadingButton>

              <Link href="#forgot" variant="body2">
                New Here or Forgotten password?
              </Link>
            </Box>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
