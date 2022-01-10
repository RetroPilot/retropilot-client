import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import Login from './components/views/login';
import UserAdmin from './components/views/useradmin';
import GlobalSnack from './components/widgets/globalSnack';
import DevicesProvider from './context/devices';
import ToastProvider from './context/toast';
import UserProvider from './context/users';
import * as authenticationController from './controllers/authentication';

// Connection opened

function App() {
  const [session, setSession] = useState(false);

  authenticationController.getSession().then((res) => {
    setSession(res.data.authenticated);
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

              {session ? <UserAdmin /> : <Login />}

            </ToastProvider>
          </DevicesProvider>
        </UserProvider>
      </ThemeProvider>

    </div>
  );
}

export default App;
