import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import Login from "./components/views/login";
import UserAdmin from "./components/views/useradmin";
import GlobalSnack from './components/widgets/globalSnack';
import DeviceStore from "./context/devices";
import ToastStore from "./context/toast";
import { UserProvider } from "./context/users";
import * as authenticationController from "./controllers/authentication";



// Connection opened




function App() {


  const [session, setSession] = useState(false)

  authenticationController.getSession().then((res) => {
    setSession(res.data.authenticated)

  })





  const theme = React.useMemo(
    () =>
      createTheme({
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
          <DeviceStore>
            <ToastStore>

              <GlobalSnack />

              {session ? <UserAdmin /> : <Login />}

            </ToastStore>
          </DeviceStore>

        </UserProvider>
      </ThemeProvider>

    </div>
  );
}

export default App;
