// worker에서 sessionStorage 접근이 안되서 만든 클래스

class SessionStorageData {
  setItem = (key, data) => {
    this[key] = data;
  }

  getItem = key => this[key];

  removeItem = key => {
    delete this[key];
  }
}

export default new SessionStorageData();
