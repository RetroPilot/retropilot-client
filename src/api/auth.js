import * as request from './request';

export async function login(email, password) {
  const response = await request.postForm('auth/login', {
    email,
    password,
  });

  const { success, data } = response;
  if (!success) {
    throw new Error(`Could not login: ${JSON.stringify(response)}`);
  }

  const { jwt, user } = data;
  console.debug('Logged in as', user);
  request.setAccessToken(jwt);
  return jwt;
}

export async function getSession() {
  const response = await request.get('auth/session');
  const { data } = response.data;
  return data.user;
}

export async function refreshAccessToken(code, provider) {
  const resp = await request.postForm('session', {
    code,
    provider,
  });

  const { access_token: accessToken } = resp;
  if (accessToken) {
    request.setAccessToken(accessToken);
    return accessToken;
  } else if (resp.response) {
    throw new Error(`Could not exchange oauth code for access token: response ${resp.response}`);
  } else if (resp.error) {
    throw new Error(`Could not exchange oauth code for access token: error ${resp.error}`);
  } else {
    console.warn('refreshAccessToken: unexpected response', resp);
    throw new Error('Could not exchange oauth code for access token');
  }
}
