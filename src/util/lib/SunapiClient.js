import Auth from './Auth';
import Http from './Http';

class SunapiClient {
  constructor() {
    this.sequencenum = 0;
    this.digestInfo = null;
    this.userName = sessionStorage.getItem('WISENET_USER_ID');
    this.password = sessionStorage.getItem('WISENET_USER_PASSWORD');
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

  post = (_url, jsonData, fileData, specialHeaders) => {
    let url = _url;
    if (typeof jsonData !== 'undefined') {
      url += this.jsonToText(jsonData);
    }

    const config = {};
    if (typeof specialHeaders !== 'undefined') {
      for (let hdrindex = 0; hdrindex < specialHeaders.length; hdrindex += 1) {
        config[specialHeaders[hdrindex].Type] = specialHeaders[hdrindex].Header;
      }
    }

    if (url.indexOf('firmwareupdate') !== -1) {
      config.timeout = 600000;
    } else {
      config.timeout = 300000;
    }

    return new Promise((resolve, reject) => {
      Http.post({ url }, { fileData }, { config })
        .then(response => {
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
          const authData = {
            header: error.response.headers,
            userid: this.userName || sessionStorage.getItem('WISENET_USER_ID'),
            password: this.password || sessionStorage.getItem('WISENET_USER_PASSWORD'),
          };
          Auth.makeAuthData(authData);
          Http.post({ url }, { fileData }, { config })
            .then(response => {
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
        });
    });
  };

  get = (_url, jsonData, config) => {
    let url = _url;
    if (typeof jsonData !== 'undefined') {
      url += this.jsonToText(jsonData);

      if (url.indexOf('attributes.cgi') === -1) {
        url += `&SunapiSeqId=${this.sequencenum}`;
        this.sequencenum += 1;
      }

      if (this.sequencenum > 100000) {
        this.sequencenum = 0;
      }
    }

    return Http.get({ url, config }).catch(error => {
      const authData = {
        header: error.response.headers,
        userid: this.userName || sessionStorage.getItem('WISENET_USER_ID'),
        password: this.password || sessionStorage.getItem('WISENET_USER_PASSWORD'),
      };
      Auth.makeAuthData(authData);
      return Http.get({ url, config });
    });
  };

  sequence = queue => {
    const currentItem = queue.shift();

    if (typeof currentItem === 'undefined') {
      return;
    }

    // Get
    if (typeof currentItem.encodeddata === 'undefined') {
      this.get(
        currentItem.url,
        currentItem.reqData,
        '',
      ).then(() => {
        if (queue.length > 0) {
          this.sequence(queue);
        }
      });
    } else { // Post
      const specialHeaders = [];
      specialHeaders[0] = {};
      specialHeaders[0].Type = 'Content-Type';
      specialHeaders[0].Header = 'application/x-www-form-urlencoded';

      this.post(
        currentItem.url,
        currentItem.reqData,
        currentItem.encodeddata,
        specialHeaders,
      ).then(() => {
        if (queue.length > 0) {
          this.sequence(queue);
        }
      });
    }
  };

  // sequence_es6 = (queue) => {
  //   // queue = [{url:'',data''}, ...]
  //   const funcs = queue.map(item => () => this.get(item.url, item.data, ''));
  //   funcs.reduce((promise, func) =>
  //     promise.then(result => func().then(Array.prototype.concat.bind(result))),
  //     Promise.resolve([]));
  // };
}

export default new SunapiClient();
