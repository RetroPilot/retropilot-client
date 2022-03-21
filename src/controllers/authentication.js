import axios from 'axios';

import config from '../config';

// eslint-disable-next-line import/prefer-default-export
export async function getSession() {
  const res = await axios.get(`${config.apiUrl}/retropilot/0/useradmin/session`, { withCredentials: true });
  return res.data;
}
