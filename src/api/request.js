import RequestConfig from './instance';

const request = new RequestConfig();

export function setAccessToken(accessToken) {
  request.setAccessToken(accessToken);
}

export async function get(endpoint, data) {
  return request.get(endpoint, data);
}

export async function post(endpoint, data) {
  return request.post(endpoint, data);
}

export async function postForm(endpoint, data) {
  return request.post(endpoint, data, false);
}

export async function patch(endpoint, data) {
  return request.patch(endpoint, data);
}

export async function put(endpoint, data) {
  return request.put(endpoint, data);
}

export async function del(endpoint, data) {
  return request.delete(endpoint, data);
}
