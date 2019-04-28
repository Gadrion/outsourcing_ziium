/**
 * mjpegDepacketizeWorker
 * @class mjpegDepacketizeWorker
 */
/* global MjpegDepacketizer */
importScripts('./mjpegDepacketizer.js');

var mjpegDepacketizer = null;
var bufferArray = [];
var isWorking = false;

onmessage = function (event) {
  var message = event.data;
  bufferArray.push(message.dataArray);

  setTimeout(depacketize, 0);
}

function depacketize() {
  if (mjpegDepacketizer === null || bufferArray.length === 0 || isWorking === true) {
    return;
  }

  isWorking = true;

  while (bufferArray.length > 0) {
    var dataArray = bufferArray.shift();
    for (var i = 0, length = dataArray.length; i < length; i += 1) {
      var data = dataArray[i];
      mjpegDepacketizer.depacketize(data.rtspInterleave, data.header, data.payload);
    }
  }

  isWorking = false;
}

function gotFrame(data) {
  var message = {
    playMode: data.playMode,
    streamData: data.streamData,
    videoInfo: data.videoInfo,
  };

  postMessage(message, [message.streamData.frameData.buffer]);
}

mjpegDepacketizer = new MjpegDepacketizer();
mjpegDepacketizer.init();
mjpegDepacketizer.setGotFrameCallback(gotFrame);