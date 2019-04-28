import SunapiClient from './SunapiClient';

// Made for use in ump
class WrapperSunapiClient {
  get = (url, jsonData, SuccessFn, FailFn) => {
    SunapiClient.get(url, jsonData)
      .then(resolve => SuccessFn(resolve))
      .catch(reject => FailFn(reject));
  };
}

export default new WrapperSunapiClient();
