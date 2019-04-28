importScripts('/external-lib/util/crypto.js','/external-lib/util/URI.js');
//	
this.digestInfo = undefined;
this.data = null;
this.working = false;
this.postMethodTimeout = 10000;
this.getMethodTimeout = 1000;

self.onmessage = function (event) {
  console.debug("event" + JSON.stringify(event.data));
  //RESTCLIENT_CONFIG = event.data.serverInfo;
  data = event.data;
  digestInfo = event.data.auth;

  if(!working) {
    if (data.method.toLowerCase() === 'post') {
      if (typeof data.body !== 'undefined')
      {
          uri += jsonToText(data.body);
      }
    
      ajax_async("POST", uri, data.scope, fileData, specialHeaders);
    } else if (data.method.toLowerCase() === 'get') {
      uri = encodeURI(data.uri);
      if (typeof data.body !== 'undefined')
      {
        uri += jsonToText(data.body);
    
        if(uri.indexOf("attributes.cgi") == -1)
        {
            var sequencenum = new Date().getTime();
            uri += "&SunapiSeqId=" + sequencenum;
        }
      }
    
      if (uri.indexOf("configbackup") !== -1 || data.async === true)
      {
        ajax_async("GET", uri, data.scope, '', '', data.isText);
      }
      else
      {
        ajax_sync("GET", uri, data.isText);
      }
    }
  }
};

self.onerror = function(err) {
  console.debug(err);
};

var ajax_async = function (method, uri, $scope, fileData, specialHeaders, isText) {
  working = true;
  if(typeof xhr !== 'undefined') {
    xhr = null;
  }
  
  xhr = makeNewRequest(method, uri, true, '', isText);

//  if (typeof digestInfo !== 'undefined'  && digestInfo !== null) {
//    setAuthorizationHeader(xhr, method, uri, digestInfo);
//  }

  setupAsyncCall(xhr, method, $scope, uri);

  if(typeof specialHeaders !== 'undefined')
  {
    var hdrindex = 0;
    for (hdrindex = 0; hdrindex < specialHeaders.length; hdrindex = hdrindex + 1)
    {
      xhr.setRequestHeader(specialHeaders[hdrindex].Type,specialHeaders[hdrindex].Header);
    }
  }

  try {
    if (typeof fileData !== 'undefined' && 
        fileData !== null && 
        fileData !== '') {
        xhr.send(fileData);
    }
    else
    {
        xhr.send();
    }
  } catch (error) {
    console.error("Error", error);
    parserError(xhr, error);
  }

  // return deferred;
};

var ajax_sync = function (method, uri, isText)
{
  working = true;
  
  if(typeof xhr !== 'undefined') {
    xhr = null;
  }

  //if(digestInfo !== undefined  && digestInfo !== null) {
    xhr = makeNewRequest(method, uri, false, '', isText);
  //} else {

  //}

//  if (typeof digestInfo !== 'undefined'  && digestInfo !== null) {
//    setAuthorizationHeader(xhr, method, uri, digestInfo);
//  }

  console.debug('=====================================>',xhr);
  try {
    xhr.send();
  } catch (error) {
    console.error("Error", error);
    parserError(xhr, error);
  }
};

// handle readystatechange
var onReadyStateChangeEventHandler = function () {
  var result = {},
        wwwAuthenticate,
        digestInfo,
        xhr;
  switch(this.readyState) {
    case this.DONE:
    {
      console.debug("Done");
      if (this.status === 401) {
        wwwAuthenticate = this.getResponseHeader('www-authenticate');
        if (wwwAuthenticate !== undefined) {
          console.log("wwwAuthenticate : ", wwwAuthenticate);
          digestInfo = getDigestInfoInWwwAuthenticate(wwwAuthenticate);
          result.id = 'auth';
          result.success = true;
          result.auth = digestInfo;
          // return result to Worker onmessage function
          self.postMessage(result);
        }
        xhr = makeNewRequest(data.method, data.uri, true, wwwAuthenticate, data.isText);
        if (typeof digestInfo !== 'undefined' && digestInfo !== null) {
              setAuthorizationHeader(xhr, data.method, data.uri, digestInfo);
        }
        setupAsyncCall(xhr, data.method, data.scope, data.uri);
        try {
          if (typeof fileData !== 'undefined' && 
              fileData !== null && 
              fileData !== '') {
              xhr.send(fileData);
          }
          else
          {
              xhr.send();
          }
        } catch (error) {
          console.error("Error", error);
        }
      }
      else
      {
        parseResponse(this);
      }
    }
    break;
    case this.LOADING:
    console.debug("Loading");
    break;
    case this.OPENED:
    console.debug("Opened");
    break;
    case this.HEADERS_RECEIVED: {
      console.debug("Header received");
      wwwAuthenticate = this.getResponseHeader('www-authenticate');
      if (wwwAuthenticate !== undefined && wwwAuthenticate !== null) {
        console.log("wwwAuthenticate : ", wwwAuthenticate);
        digestInfo = getDigestInfoInWwwAuthenticate(wwwAuthenticate);
        result.id = 'auth';
        result.success = true;
        result.auth = digestInfo;
        // return result to Worker onmessage function
        self.postMessage(result);
      }
      var allResponseHeaders = this.getAllResponseHeaders();
      console.debug("allResponseHeaders: ", allResponseHeaders);
      xhr = makeNewRequest(data.method, data.uri, true, wwwAuthenticate, data.isText);
      if (typeof digestInfo !== 'undefined' && digestInfo !== null) {
         setAuthorizationHeader(xhr, data.method, data.uri, digestInfo);
      }
      setupAsyncCall(xhr, data.method, data.$scope, data.uri);

      try {
        if (typeof fileData !== 'undefined' && 
            fileData !== null && 
            fileData !== '') {
            xhr.send(fileData);
        }
        else
        {
            xhr.send();
        }
      } catch (error) {
        console.error("Error", error);
        parserError(xhr, error);
      }
    }
    break;
    case this.UNSENT:
    console.debug("Unsent");
    break;
  }
};

var updateProgress = function(event) {
   if (event.lengthComputable) 
   {  // evt.loaded the bytes the browser received
      // evt.total the total bytes set by the header
      // jQuery UI progress bar to show the progress on screen
     var percentComplete = (event.loaded / event.total) * 100;  
     //$('#progressbar').progressbar( "option", "value", percentComplete );
     console.log("percent " + percentComplete);
   } 
} ;

function parseResponse(xhr)
{
  var result = {};

  if (xhr.readyState === xhr.DONE)
  {
    if (xhr.status === 200)
    {
//      console.log("xhr.response" + xhr.responseText);

      if (typeof xhr.response !== 'undefined' && xhr.response !== "")
      {
        if (xhr.responseType === 'arraybuffer' || xhr.responseXML !== null || data.isText)
        {
          result.id = 'response';
          result.success = true;
          result.status = xhr.status;
          result.response = xhr.response;

          xhr = null;
          // return result to Worker onmessage function
          self.postMessage(result);            
        }
        else
        {
          var resp;
          if (isJSON(xhr.response) === false) {
            resp = getDotEqualStrLineToObj(xhr.response);
          } else {
            resp = JSON.parse(xhr.response);  
          }
          if (typeof resp === 'object')
          {
            //result = resp;
            if (result.Response === "Fail")
            {
              result.id = 'error';
              result.success = false;
              result.status = xhr.status;
              result.Error.Details;

              xhr = null;
              // return result to Worker onmessage function
              self.postMessage(result);
            }
            else
            {
              result.id = 'response';
              result.success = true;
              result.status = xhr.status;
              result.response = resp;

              xhr = null;
              // return result to Worker onmessage function
              self.postMessage(result);
            }
          }
          else
          {
            result.id = 'response';
            result.success = true;
            result.status = xhr.status;
            result.response = xhr.response;

            xhr = null;
            // return result to Worker onmessage function
            self.postMessage(result);
          }
        }    
      }
    } else {
      result.id = 'error';
      result.success = false;
      result.status = xhr.status;

      xhr = null;
      // return result to Worker onmessage function
      self.postMessage(result); 
    }
  }
}

function parserError(xhr, error) {
  var result = {};
 
  result.id = 'error';
  result.success = false;
  result.code = error.code;
  result.status = xhr.status;
  result.message = error.message;

  // return result to Worker onmessage function
  self.postMessage(result);          
}
/*
var clearObjectValues = function(objToClear) {
  Object.keys(objToClear).forEach((param) => {
      if ( (objToClear[param]).toString() === "[object Object]" ) {
          clearObjectValues(objToClear[param]);
      } else {
          objToClear[param] = undefined;
      }
  })
  return objToClear;
};
*/
var makeNewRequest = function (method, uri, isAsync, wwwAuthenticate, isText) {
    var restClientConfig = data.deviceInfo;
    var server = restClientConfig.protocol + '://' +  restClientConfig.hostname;
    if (typeof restClientConfig.port !== 'undefined' && 
        restClientConfig.port !== null && 
        restClientConfig.port !== '') {
        server += ':' + restClientConfig.port;
    }
    var xhr = new XMLHttpRequest();
//    xhr.addEventListener("load", XHRLoadHandler);
//    xhr.addEventListener("error", XHRErrorHandler);
    xhr.open(method, server + uri, isAsync);
    //if(SessionOfUserManager.IsWMFApp() === true  && data.deviceInfo.serverType === 'camera' &&
     //   (checkStaleResponseIssue(uri) === false))
    if(data.deviceInfo.serverType === 'camera') {
        //Added for same origin request, now using custom digest to avoid browser hang and popups
         xhr.setRequestHeader('XClient', 'XMLHttpRequest');
    }
    if(!data.isText || typeof data.isText === 'undefined') {
      xhr.setRequestHeader('Accept', 'application/json');
    }
    /** If there is a new Challenge from server, update the local digest cache  */
    if (wwwAuthenticate !== '' && 
        wwwAuthenticate !== undefined && 
        wwwAuthenticate !== null) {
      var result = {};

      responseHeaders = wwwAuthenticate.split('\n');
      digestInfo = getDigestInfoInWwwAuthenticate(wwwAuthenticate);

      result.id = 'auth';
      result.success = true;
      result.auth = digestInfo;

      // return result to Worker onmessage function
      self.postMessage(result);

      setAuthorizationHeader(xhr, method, uri, digestInfo);      
    } else if(typeof digestInfo !== 'undefined' && digestInfo !== null) {
      setAuthorizationHeader(xhr, method, uri, digestInfo);
    }
    xhr.onreadystatechange = onReadyStateChangeEventHandler;
    xhr.onprogress = updateProgress;

    // else
    // {
        /** Sometime the digest issued by the server becomes invalid,
        we need to request new digest from server again */
        // if (typeof digestInfo !== 'undefined' &&  digestInfo !== null)
        // {
          // setDigestHeader(xhr, method, uri, digestInfo);
        // } else { // by neighbor21  duks
        	// setDigestHeader(xhr, method, uri);
        // }
    // }
    return xhr;
};

var setAuthorizationHeader = function (xhr, method, uri, digestCache) {
  var responseValue, digestAuthHeader;
  if (digestCache) { // by neighbor21 duks  조건으로 구분 - digestCache 없는 경우가 있음.. 없는경우 로직 추가
    if (digestCache.scheme.toLowerCase() === 'digest') {
      digestCache.nc = digestCache.nc + 1;
      digestCache.cnonce = generateCnonce();
      responseValue = formulateResponse(data.deviceInfo.username, data.deviceInfo.password, uri, digestCache.realm, method.toUpperCase(), digestCache.nonce, digestCache.nc, digestCache.cnonce, digestCache.qop);
      digestAuthHeader = digestCache.scheme + ' ' + 'username="' + data.deviceInfo.username + '", ' + 'realm="' + digestCache.realm + '", ' + 'nonce="' + digestCache.nonce + '", ' + 'uri="' + uri + '", ' + 'cnonce="' + digestCache.cnonce + '" ' + 'nc=' + decimalToHex(digestCache.nc, 8) + ', ' + 'qop=' + digestCache.qop + ', ' + 'response="' + responseValue + '"';
      xhr.setRequestHeader("Authorization", digestAuthHeader);
    } else if (digestCache.scheme.toLowerCase() === 'xdigest') {
      digestCache.nc = digestCache.nc + 1;
      digestCache.cnonce = generateCnonce();
      responseValue = formulateResponse(data.deviceInfo.username, data.deviceInfo.password, uri, digestCache.realm, method.toUpperCase(), digestCache.nonce, digestCache.nc, digestCache.cnonce, digestCache.qop);
      digestAuthHeader = digestCache.scheme + ' ' + 'username="' + data.deviceInfo.username + '", ' + 'realm="' + digestCache.realm + '", ' + 'nonce="' + digestCache.nonce + '", ' + 'uri="' + uri + '", ' + 'cnonce="' + digestCache.cnonce + '" ' + 'nc=' + decimalToHex(digestCache.nc, 8) + ', ' + 'qop=' + digestCache.qop + ', ' + 'response="' + responseValue + '"';
      xhr.setRequestHeader("Authorization", digestAuthHeader);
    } else if (digestCache.scheme.toLowerCase() === 'basic') {
      digestAuthHeader = digestCache.scheme + ' ' + btoa(RESdata.deviceInfo.username + ':' + data.deviceInfo.password);
      xhr.setRequestHeader("Authorization", digestAuthHeader);
    }
  } else {
    /// by neighbor21 duks DigestCache 정보 없는 경우 임의로 할당
    digestCache = {
    	"scheme":"Digest",
    	"realm" : "",
    	"nonce" : null,
    	"opaque" : null,
    	"qop" : "auth",
    	"nc" : null,
    	"cnonce" : null
    };
    responseValue = formulateResponse(data.deviceInfo.username, data.deviceInfo.password, uri, digestCache.realm, method.toUpperCase(), digestCache.nonce, digestCache.nc, digestCache.cnonce, digestCache.qop);
    digestAuthHeader = digestCache.scheme + ' ' + 'username="' + data.deviceInfo.username + '", ' + 'realm="' + digestCache.realm + '", ' + 'nonce="' + digestCache.nonce + '", ' + 'uri="' + uri + '", ' + 'cnonce="' + digestCache.cnonce + '" ' + 'nc=' + decimalToHex(digestCache.nc, 8) + ', ' + 'qop=' + digestCache.qop + ', ' + 'response="' + responseValue + '"';
    xhr.setRequestHeader("Authorization", digestAuthHeader);
  }
};

var getDigestInfoInWwwAuthenticate = function (wwwAuthenticate) {
  var digestHeaders = wwwAuthenticate;
  var scheme = null;
  var realm = null;
  var nonce = null;
  var opaque = null;
  var qop = null;
  var cnonce = null;
  var nc = null;
  var returnValue = false;
  
  if (digestHeaders !== null) {
    digestHeaders = digestHeaders.split(',');
    scheme = digestHeaders[0].split(/\s/)[0];
    
    for (var i = 0; i < digestHeaders.length; i++) {
      var keyVal = digestHeaders[i].split('=');
      var key = keyVal[0];
      var val = keyVal[1].replace(/\"/g, '').trim();
      
      if (key.match(/realm/i) !== null) {
          realm = val;
      }
      
      if (key.match(/nonce/i) !== null) {
          nonce = val;
      }
      
      if (key.match(/opaque/i) !== null) {
          opaque = val;
      }
      
      if (key.match(/qop/i) !== null) {
          qop = val;
      }
    }

    cnonce = generateCnonce();
    nc++;

    returnValue = {"scheme": scheme, "realm": realm, "nonce": nonce, "opaque": opaque, "qop": qop, "cnonce": cnonce, "nc": nc};
  }

  return returnValue;
};

var setupAsyncCall = function (xhr, method, callbackList, uri) {
  var OnErrorEvent = function (evt)
  {
    throw Error("Network Error");
  };
  if (typeof callbackList !== 'undefined' && callbackList !== '')
  {
    if (typeof callbackList.ProgressEvent !== 'undefined')
    {
        xhr.upload.addEventListener("progress", callbackList.ProgressEvent, false);
    }
    if (typeof callbackList.CompleteEvent !== 'undefined')
    {
        xhr.addEventListener("load", callbackList.CompleteEvent, false);
    }
    if (typeof callbackList.CancelEvent !== 'undefined')
    {
        xhr.addEventListener("abort", callbackList.CancelEvent, false);
    }
    if (typeof callbackList.FailEvent !== 'undefined')
    {
        xhr.addEventListener("error", callbackList.FailEvent, false);
    }
    else
    {
        xhr.addEventListener("error", OnErrorEvent, false);
    }
  }

  if (method === 'POST') {
      xhr.timeout = postMethodTimeout;
  } else {
      xhr.timeout = getMethodTimeout;
  }

  if(data.deviceInfo.timeout !== 'undefined') {
    xhr.timeout = data.deviceInfo.timeout;
  }

  if (uri.indexOf("configbackup") !== -1) {
      xhr.responseType = 'arraybuffer';
  }
  if (uri.indexOf("opensdk") !== -1) {
      xhr.withCredentials = true;
  }
};

var formulateResponse = function (username, password, uri, realm, method, nonce, nc, cnonce, qop) {
  var HA1 = CryptoJS.MD5(username + ':' + realm + ':' + password).toString();
  var HA2 = CryptoJS.MD5(method + ':' + uri).toString();
  var response = CryptoJS.MD5(HA1 + ':' + nonce + ':' + decimalToHex(nc, 8) + ':' + cnonce + ':' + qop + ':' + HA2).toString();
  return response;
};

var generateCnonce = function () {
  var characters = 'abcdef0123456789';
  var token = '';
  for (var i = 0; i < 16; i++) {
    var randNum = Math.round(Math.random() * characters.length);
    token += characters.substr(randNum, 1);
  }
  return token;
};

var decimalToHex = function (d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === 'undefined' || padding === null ? padding = 2 : padding;
  
  while (hex.length < padding) {
      hex = "0" + hex;
  }
  return hex;
};

var clearDigestCache = function () {
  console.log('Clearing the Diegest cache !!!!!!!!!!!! ');
  digestInfo = undefined;
};

var jsonToText = function (json) {
  var uri = '';
  for (var key in json)
  {
      if (typeof json[key] === 'boolean')
      {
          uri += '&' + key + '=' + (json[key] === true ? "True" : "False");
      }
      else
      {
          uri += '&' + key + '=' + json[key];
      }
  }
  return uri;
};

/// by neighbor21 duks 응답 데이터가 카메라와 NVR과 달라 파싱하는 함수를 추가함  -- '=' 로 Value 구분 'aaa.bbb.ccc=vlaue'
var getDotEqualStrLineToObj = function (data){
      var res = {};
      var tmRes = {};
      var strRes = data.split('\r\n');
      for ( var i = 0; i < strRes.length; i++) {
            if (!strRes[i]) continue;
            var strKeyArr = strRes[i].split('=');
            var strDotArr = strKeyArr[0].split('.');
            if (strDotArr.length == 1){
                  res[strDotArr[0]] = strKeyArr[1];
            } else {
                  for ( var j = 0; j < strDotArr.length; j++) {
                        if (j == 0){
                              if(!res[strDotArr[j]]) res[strDotArr[j]] = {};
                              tmRes = res[strDotArr[j]];
                        } else if (j < strDotArr.length-1){
                              if (!tmRes[strDotArr[j]]) tmRes[strDotArr[j]] = {};
                              tmRes = tmRes[strDotArr[j]];
                        } else if (j == strDotArr.length-1){
                              tmRes[strDotArr[j]] = strKeyArr[1];
                              
                        }
                        
                  }
            }
      }
      console.log('result : '+JSON.stringify(res));
      return res;

};

var isJSON = function (str) {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
};

var version = function() { return '0.0.1' ;};