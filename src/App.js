import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Login from './components/views/login';
import UserAdmin from './components/views/useradmin';
import GlobalSnack from './components/widgets/globalSnack';
import DevicesProvider from './context/devices';
import ToastProvider from './context/toast';
import UserProvider from './context/users';
import * as authenticationController from './controllers/authentication';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  authenticationController.getSession().then((session) => {
    const { authenticated } = session.data;
    setAuthenticated(authenticated);
  });

  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      },
    }),
    [],
  );

  return (
    <div className="App">

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <UserProvider>
          <DevicesProvider>
            <ToastProvider>

              <GlobalSnack />

              {isAuthenticated ? <UserAdmin /> : <Login />}

            </ToastProvider>
          </DevicesProvider>
        </UserProvider>
      </ThemeProvider>

    </div>
  );
}

export default App;
