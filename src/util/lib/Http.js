import axios from 'axios';
import { Auth } from 'util/lib';

class Http {
  get = ({ url, config }) => {
    const digestHeader = Auth.makeDigestHeader('GET', url);
    return axios.get(url, {
      ...digestHeader,
      ...config,
    });
  }

  post = ({
    url,
    params,
    data,
    timeout,
  }) => {
    const digestHeader = Auth.makeDigestHeader('POST', url);
    return axios.post(url, data, {
      ...digestHeader,
      params,
      timeout,
    });
  }
}

export default new Http();
