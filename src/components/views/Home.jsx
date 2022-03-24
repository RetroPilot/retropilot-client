import React from 'react';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <p>hello</p>
      <Link to="/login" variant="body2">
        login?
      </Link>
    </ThemeProvider>
  );
}

export default Home;
