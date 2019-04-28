import CryptoJS from 'crypto-js';
import { SessionStorageData } from 'util/worker/lib';
import axios from 'axios';

const decimalToHex = (dec, _padding) => {
  let hex = Number(dec).toString(16);
  const padding = typeof (_padding) === 'undefined' || _padding === null ? 2 : _padding;

  while (hex.length < padding) {
    hex = `0${hex}`;
  }
  return hex;
};

const formulateResponse = (_username, _password, url, realm, method, nonce, nc, cnonce, qop) => {
  const HA1 = CryptoJS.MD5(`${_username}:${realm}:${_password}`).toString();
  const HA2 = CryptoJS.MD5(`${method}:${url}`).toString();
  const response = CryptoJS.MD5(`${HA1}:${nonce}:${decimalToHex(nc, 8)}:${cnonce}:${qop}:${HA2}`).toString();

  return response;
};

const generateCnonce = () => {
  const characters = 'abcdef0123456789';
  let token = '';
  for (let i = 0; i < 16; i += 1) {
    const randNum = Math.round(Math.random() * characters.length);
    token += characters.substr(randNum, 1);
  }
  return token;
};

const makeDigestHeader = ({ responeHeader }) => {
  if (responeHeader) {
    if (Object.prototype.hasOwnProperty.call(responeHeader, 'www-authenticate')) {
      return {
        realm: responeHeader['www-authenticate'].split('"')[1],
        nonce: responeHeader['www-authenticate'].split('"')[3],
        qop: responeHeader['www-authenticate'].split('"')[5],
        cnonce: '0482f40715d384c',
        opaque: null,
        scheme: 'Digest',
        nc: 0,
      };
    }
  }
  return null;
}

class DigestHttp {
  userid = null;
  password = null;
  digestHeader = null;

  init = ({ userid, password, digestHeader }) => {
    console.log('init', userid);
    this.userid = userid;
    this.password = password;
    this.digestHeader =  JSON.parse(digestHeader);
  }

  setDigestHeader = responeHeader => {
    this.digestHeader = makeDigestHeader({ responeHeader });
  }

  makeDigestHeaderAuthorization = (method, url) => {
    // this.userid = SessionStorageData.getItem('WISENET_USER_ID');
    // this.password = SessionStorageData.getItem('WISENET_USER_ID');
    // this.digestHeader = SessionStorageData.getItem('WISENET_AUTH');

    if (this.digestHeader === null) {
      return null;
    }
  
    let digestHeaderAuthorization = null;
    if (this.digestHeader.scheme.toLowerCase() === 'digest' || this.digestHeader.scheme.toLowerCase() === 'xdigest') {
      this.digestHeader.nc += 1;
      this.digestHeader.cnonce = generateCnonce();
  
      const responseValue = formulateResponse(this.userid, this.password, url, this.digestHeader.realm,
        method.toUpperCase(), this.digestHeader.nonce, this.digestHeader.nc,
        this.digestHeader.cnonce, this.digestHeader.qop);
  
      digestHeaderAuthorization = `${this.digestHeader.scheme} username="${this.userid}", realm="${this.digestHeader.realm}", nonce="${this.digestHeader.nonce}", uri="${url}", cnonce="${this.digestHeader.cnonce}" nc="${decimalToHex(this.digestHeader.nc, 8)}", qop="${this.digestHeader.qop}", response="${responseValue}"`;
    } else if (this.digestHeader.scheme.toLowerCase() === 'basic') {
      digestHeaderAuthorization = `${this.digestHeader.scheme} ${btoa(`${this.userid}:${this.password}`)}`;
    }
  
    SessionStorageData.setItem('WISENET_AUTH', JSON.stringify(this.digestHeader));
  
    return { headers: { Authorization: digestHeaderAuthorization } };
  }

  jsonToText = json => {
    let url = '';

    Object.keys(json).forEach(key => {
      if (typeof json[key] === 'boolean') {
        url += `&${key}=${(json[key] === true ? 'True' : 'False')}`;
      } else {
        url += `&${key}=${json[key]}`;
      }
    });

    return url;
  };

  get = ({ url, jsonData, params, timeout, ...rest }) => {
    if (typeof jsonData !== 'undefined') {
      url += this.jsonToText(jsonData);
    }

    const digestHeader = this.makeDigestHeaderAuthorization('GET', url);
    return new Promise((resolv, reject) => {
      axios.get(url, {
        ...digestHeader,
        params,
        timeout,
        ...rest,
      }).then(response => {
        if (response.status === 200) {
          if (typeof response !== 'undefined' && response !== '') {
            resolve(response);
          } else {
            reject(new Error('No response'));
          }
        } else {
          reject(new Error('unknown exception'));
        }
      })
      .catch(error => {
        this.setDigestHeader(error.response.headers);
        const digestHeader = this.makeDigestHeaderAuthorization('GET', url);
        axios.post({
          ...digestHeader,
          params,
          timeout,
          ...rest,
        }).then(response => {
            if (response.status === 200) {
              if (typeof response !== 'undefined' && response !== '') {
                resolve(response);
              } else {
                reject(new Error('No response'));
              }
            } else {
              reject(new Error('unknown exception'));
            }
          })
          .catch(exception => {
            reject(exception);
          });
      })
    });
  }

  post = ({
    url,
    jsonData,
    params,
    data,
    timeout,
    ...rest
  }) => {
    if (typeof jsonData !== 'undefined') {
      url += this.jsonToText(jsonData);
    }

    const digestHeader = this.makeDigestHeaderAuthorization('POST', url);
    return axios.post(url, data, {
      ...digestHeader,
      params,
      timeout,
      ...rest,
    });
  }
}

export default new DigestHttp();
