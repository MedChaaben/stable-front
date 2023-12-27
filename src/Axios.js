import axios from 'axios';
export class AxiosClient {
  baseUrl;
  instance;
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.instance = axios.create({
      baseURL: this.baseUrl,
    });
  }
  get(uri) {
    return this.instance.get(uri);
  }
  post(uri, data) {
    return this.instance.post(uri, data);
  }
  put(uri, data) {
    return this.instance.put(uri, data);
  }
  delete(uri) {
    return this.instance.delete(uri);
  }
  setResponseType(responseType) {
    this.instance.defaults.responseType = responseType;
  }
  setHeaders(headers) {
    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        this.instance.defaults.headers[key] = value;
      }
    }
  }
}

export const axiosClient = new AxiosClient('/api');
