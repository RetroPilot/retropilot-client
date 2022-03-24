import qs from 'query-string';

export default class RequestConfig {
  constructor(baseUrl = process.env.REACT_APP_API_URL) {
    this.baseUrl = `${baseUrl}${!baseUrl.endsWith('/') ? '/' : ''}api/`;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  setAccessToken(accessToken) {
    if (accessToken) {
      this.defaultHeaders.Authorization = `JWT ${accessToken}`;
    }
  }

  async request(method, path, params, dataJson = true, responseJson = true) {
    const headers = { ...this.defaultHeaders };
    if (!dataJson) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    let url = this.baseUrl + path;
    let body;
    if (params && Object.keys(params).length > 0) {
      if (method === 'GET' || method === 'HEAD') {
        url += `?${qs.stringify(params)}`;
      } else if (dataJson) {
        body = JSON.stringify(params);
      } else {
        body = qs.stringify(params);
      }
    }

    console.debug(`fetch ${method} ${url}`);
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`${response.status} ${response.statusText}: ${error}`);
    } else if (!responseJson) {
      return response;
    }
    return response.json();
  }
}

['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'].forEach((method) => {
  const methodName = method.toLowerCase();
  RequestConfig.prototype[methodName] = async function (path, params, dataJson, responseJson) {
    return this.request(method, path, params, dataJson, responseJson);
  };
});
