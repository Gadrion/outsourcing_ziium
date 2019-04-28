/* global JSDecoder, AssemblyDecoder */
/**
 * decoderWorker
 * @class decoderWorker
 */
var webAssemblyCheck;
 //@if SUPPORT_WEBASSEMBLY == false
    webAssemblyCheck = false;
 //@endif
 //@if SUPPORT_WEBASSEMBLY == true
    webAssemblyCheck = (typeof (WebAssembly) !== "undefined");
 //@endif
if (webAssemblyCheck === false) {
  console.log("Load ASM.JS Decoder");
   importScripts(
     './ASM/jsDecoder.js',
     './ASM/asmjs_ffmpeg.js');
} else {
  console.log("Load WebAssembly Decoder");
  importScripts(
    './WASM/assemblyDecoder.js',
    './WASM/ffmpeg.js'
  );
}

addEventListener('message', receiveMessage, false);

var decoder = null, 
      frameRate,
      timer = {
        interval: 33
      },
      decodedClock = null, 
      usePacketDrop = true,
      decodedFrame = null;

function receiveMessage(event) {
  var message = event.data;
  switch (message.type) {
    case 'createDecoder':
      decoder = (webAssemblyCheck === false ? JSDecoder(message.data) : AssemblyDecoder(message.data));
      decoder.setChannel(event.data.channelId);
      break;
    case 'terminate':
      if (decoder !== null) {
        decoder.close();
      }
      sendMessage('terminated', {
        'channelId': decoder.getChannel()
      });
      break;
    case 'setOutputSize':
      if (decoder !== null) {
        decoder.setOutputSize(message.data);
      }
      break;
    case 'useDropPacket':
      usePacketDrop = message.data;
      break;
    case 'setFrameRate':
      if (usePacketDrop) {
        frameRate = message.data;
        if (frameRate !== undefined) {
          timer.interval = Math.floor(1000 / frameRate);
        }
      }
      break;
    case 'decode':
      if (decoder !== null) {
        var prev;

        if (usePacketDrop) {
          if (decodedClock < (timer.interval * 2) || message.data.frameType === 'I') {
            prev = performance.now();
            decodedFrame = decoder.decode(message.data);
            decodedClock = performance.now() - prev;
            //console.log("decode time:", decodedClock);
          }
        } else {
          decodedFrame = decoder.decode(message.data);
        }

        message.data.frameData = null;
        if (decodedFrame !== null) {
          var data = {
            'channelId': decoder.getChannel(),
            'frame': decodedFrame,
            'time': message.data.timeStamp,
            'width': message.data.width,
            'height': message.data.height,
            'receiveClock': message.data.receiveClock,
          };
          sendMessage('decoded', data);
          decodedFrame = null;
        } else {
          if (message.data.playMode === 'Playback') {
            postMessage({
              'type': 'notReady'
            });
          } else {
            message.data = null;
          }
        }
      }
      break;
    default:
      break;
  }
}

function sendMessage(type, data) {
  var event = {
    'type': type,
    'data': data
  };
  postMessage(event);
}