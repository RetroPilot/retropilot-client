import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/users';

const theme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  console.log('component', state);
  const handleSubmit = (event) => {
    dispatch({ type: 'toggle_button' });

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    setLoading(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <p>hello</p>
      <Link to="/login" variant="body2">
        login?
      </Link>
    </ThemeProvider>
  );
}
