import * as request from './request';

export async function listDevices() {
  return request.get('devices');
}

export default null;
