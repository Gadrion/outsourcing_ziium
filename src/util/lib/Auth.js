import CryptoJS from 'crypto-js';

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

class Auth {
  constructor() {
    this.loggedIn = false;
    this.userid = sessionStorage.getItem('WISENET_USER_ID') || null;
    this.password = sessionStorage.getItem('WISENET_USER_PASSWORD') || null;
    this.auth = JSON.parse(sessionStorage.getItem('WISENET_AUTH')) || null;

    if (this.userid && this.password && this.auth) {
      this.loggedIn = true;
    }
  }

  init() {
    this.loggedIn = false;
    this.userid = null;
    this.password = null;
    this.auth = null;
    sessionStorage.removeItem('WISENET_USER_ID');
    sessionStorage.removeItem('WISENET_USER_PASSWORD');
    sessionStorage.removeItem('WISENET_AUTH');
  }

  makeAuthData(data) {
    const { header, userid, password } = data;
    if (header) {
      if (Object.prototype.hasOwnProperty.call(header, 'www-authenticate')) {
        this.auth = {
          realm: header['www-authenticate'].split('"')[1],
          nonce: header['www-authenticate'].split('"')[3],
          qop: header['www-authenticate'].split('"')[5],
          cnonce: '0482f40715d384c',
          opaque: null,
          scheme: 'Digest',
          nc: 0,
        };
      }
    }
    this.userid = userid || this.userid;
    this.password = password || this.password;
  }

  makeDigestHeader(method, url) {
    if (this.auth === null) {
      return null;
    }

    let digestHeader = null;
    if (this.auth.scheme.toLowerCase() === 'digest' || this.auth.scheme.toLowerCase() === 'xdigest') {
      this.auth.nc += 1;
      this.auth.cnonce = generateCnonce();

      const responseValue = formulateResponse(this.userid, this.password, url, this.auth.realm,
        method.toUpperCase(), this.auth.nonce, this.auth.nc,
        this.auth.cnonce, this.auth.qop);

      digestHeader = `${this.auth.scheme} username="${this.userid}", realm="${this.auth.realm}", nonce="${this.auth.nonce}", uri="${url}", cnonce="${this.auth.cnonce}" nc="${decimalToHex(this.auth.nc, 8)}", qop="${this.auth.qop}", response="${responseValue}"`;
    } else if (this.auth.scheme.toLowerCase() === 'basic') {
      digestHeader = `${this.auth.scheme} ${btoa(`${this.userid}:${this.password}`)}`;
    }

    sessionStorage.setItem('WISENET_AUTH', JSON.stringify(this.auth));

    return { headers: { Authorization: digestHeader } };
  }

  isAuthenticated() {
    return this.loggedIn;
  }

  loginSuccess() {
    this.loggedIn = true;
    sessionStorage.setItem('WISENET_USER_ID', this.userid);
    sessionStorage.setItem('WISENET_USER_PASSWORD', this.password);
  }

  loginFailed() {
    this.init();
  }

  logout() {
    this.init();
  }

  getUserid() {
    return this.userid;
  }
}

export default new Auth();
