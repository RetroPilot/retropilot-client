import axios from 'axios';

export async function getSession() {
  const req = await axios.get('http://localhost/retropilot/0/useradmin/session', { withCredentials: true });
  return req.data;
}
