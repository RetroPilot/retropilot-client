import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export async function getSession() {
  const req = await axios.get('http://localhost/retropilot/0/useradmin/session', { withCredentials: true });
  return req.data;
}
