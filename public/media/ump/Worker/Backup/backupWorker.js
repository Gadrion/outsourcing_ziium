/* global AviFileWriter,Uint8Array */
'use strict';

importScripts('./avi_format_writer.js',
	'./avi_file_writer.js',
	'./audioBackup.js',
  './videoBackup.js');

/**
 *  fromHex().  Convert a hex string to ascii text.
 */
function fromHex(hex) {
  return parseInt(hex, 16);
}

function inheritObject(base, properties) {
  var keyList = Object.keys(properties);
  for (var i = 0; i < keyList.length; i++) {
    base[keyList[i]] = properties[keyList[i]];
  }
  return base;
}
addEventListener('message', receiveMessage, false);

var backupSession = null;
/**
 * Processing received message from backupProvider
 * @function receiveMessage
 * @param {Object} event containing backup command & frame packet
 * @param {Object} event.data message data Object
 * @param {string} event.data.type command
 * @param {string} event.data.data detail info for processing command
 * @param {string} event.data.data.fileName backup filename
 * @param {Object} event.data.data.frameInfo frame information
 * @param {Uint8Array[]} event.data.data.streamData frame packet
 */
function receiveMessage(event) {
  var message = event.data;

  switch (message.type) {
    case 'start':
      backupSession = new BackupSession();
      backupSession.setFileName(message.data.fileName);
      break;
    case 'sendVideoFrame':
      backupSession.onVideoData(message.data.frameInfo, message.data.streamData);
      break;
    case 'sendAudioFrame':
      backupSession.onAudioData(message.data.frameInfo, message.data.streamData);
      break;
    case 'stop':
      backupSession.endSession();
      backupSession = null;
      close();
      break;
  }
}

/**
 * Send message to backupProvider
 * @param {string} target type of message
 * @param {Uint8Array} data AVI container
 */
function sendMessageCallback(target, data) {
  var event = {
    'type': target,
    'data': data,
  }
  postMessage(event);
}

/**
 * Class writing Avi format
 * @class BackupSession
 */
var BackupSession = function () {
  var fileInfo = null;

  /**@constant {int} HEADER_BYTES 2048*/
  var HEADER_BYTES = 2048;

  /**
   * @member {Object} videoFrame
   * @memberof BackupSession
   * @inner
   */
  var videoFrame = {};
  /**
   * @member {Object} audioFrame
   * @memberof BackupSession
   * @inner
   */
  var audioFrame = {};
  /**@constant {int} G7XX_SAMPLING_RATE 8000*/
  var G7XX_SAMPLING_RATE = 8000;
  /**@constant {int} AAC_SAMPLING_RATE 16*1000*/
  var AAC_SAMPLING_RATE = 16000;
  /**@constant {int} G711_BITRATE 64*1000*/
  var G711_BITRATE = 64000;
  /**@constant {int} AAC_BITRATE 48*1000*/
  var AAC_BITRATE = 48000;

  /**@constant {int} KILOBYTE 1000*/
  var KILOBYTE = 1000;
  /**@constant {int} KILOBYTE 1000*1000 */
  var MEGABYTE = KILOBYTE*KILOBYTE;
  /**@constant {int} MIN_DOUBLE_FIGURES 10 */
  var MIN_DOUBLE_FIGURES = 10;

  var MAX_FILESIZE = 500 * 1.04858; // 500MiB

  var createAviFile = null;
  var createFileCount = 0;
	/**
	 * avi file name
	 * @member {String} fileName
	 */
  var fileName = "";
  /**
   * to check playback backup or instant recording
   * @member {Boolean} isPlayback
   * @memberof BackupSession
   * @inner
   */
  var isPlayback = false;

  function Constructor() {
    fileInfo = null;
    this.init();
  }

  Constructor.prototype = {
    /**
     * initialize variables
     * @constructs BackupSession
     */
    init: function () {
      isPlayback = false;

      createAviFile = new AviFileWriter();

      fileName = "";
      createFileCount = 0;
    },
    /**
     * check exceed support max size or not
     * @function checkMaxSize
     * @memberof BackupSession
     * @instance
     * @return {boolean} true if exceed maxinum file size
     */
    checkMaxSize: function () {
      //console.log("current size is :", (HEADER_BYTES + fileInfo.pos +fileInfo.tailSize + 4 )/1000000);
      if ((HEADER_BYTES + fileInfo.pos + fileInfo.tailSize + 4) / MEGABYTE > MAX_FILESIZE) {
        console.log('exceed maximun file size (500MB)');

        this.convertValidResolution();
        this.writeAviHeader();
        this.writeAviTail();
        sendMessageCallback('backup', {
          'target': 'save',
          'data': this.getFileName()+"_"+(++createFileCount)
        });
        fileInfo = null;
        videoFrame = {};
        return true;
      }
      return false;
    },
    /**
     * set videoFrame info using input framePacket
     * @function setVideoFrameInfo
     * @memberof BackupSession
     * @instance
     * @param {Object} data received data from RTPClient. <br>data containing video Frame info
     * @param data.frameType {String} frampeType ('I' or 'P')
     * @param data.framerate {int} framerate value (0~60)
     * @param data.width {int} frame's width
     * @param data.height {int} frame's height
     * @param data.codectype {String} codec type
     * @param data.PESsize {int} frame's size
     * @param
     */
    setVideoFrameInfo: function (data) {
      var isFirstFrame = false;
      if (typeof videoFrame.codectype === "undefined") {
        isFirstFrame = true;
      }
      if (fileInfo === null) {
        fileInfo = {};
        fileInfo.pos = 4;
        fileInfo.tailSize = 0;
        sendMessageCallback('backupResult', {
          'errorCode': fromHex('0x0600'),
          'oldErrorCode': 0,
          'description': 'backup',
          'filename': fileName
        });
      }

      videoFrame.framerate = data.framerate * 1;
      videoFrame.width = fileInfo.width = data.width * 1;
      videoFrame.height = fileInfo.height = data.height * 1;
      videoFrame.frameType = data.frameType;
      if (data.codectype === 'MJPEG') {
        videoFrame.codectype = 'MJPG';
      } else if (data.codectype === 'H264') {
        videoFrame.codectype = 'H264';
      } else if (data.codectype === 'H265') {
        videoFrame.codectype = 'HEVC';
      }
      videoFrame.PESsize = data.PESsize;
      videoFrame.sourceInputMs = data.timestamp * 1;
      if (data.timestamp_usec !== null) {
        videoFrame.sourceInputMs *= 1000;
        videoFrame.sourceInputMs += Math.floor(data.timestamp_usec);
        videoFrame.sourceInputMs = Math.floor(videoFrame.sourceInputMs / 10) * 10;
        if (isPlayback === false) {
          isPlayback = true;
        }

        sendMessageCallback('backupResult', {
          'errorCode': fromHex('0x0603'),
          'description': 'timestamp of backup',
          'timeStamp': {
            'timestamp': data.timestamp,
						'timestamp_usec': data.timestamp_usec,
						'timezone': data.timezone
          }
        });
      }

      if (isFirstFrame === true) {
        createAviFile.initHeader('video', videoFrame);
      }
    },
    /**
     * set audioFrame info using input framePacket
     * @function setAudioFrameInfo
     * @memberof BackupSession
     * @instance
     * @param {Object} data received data from audioWorker. <br>data containing audio Frame info
     * @param data.type {String} frame type ('audio')
     * @param data.bitrate {int} bitrate
     * @param data.codectype {String} codec type
     * @param data.PESsize {int} frame's size
     */
    setAudioFrameInfo: function (data) {
      var isFirstFrame = false;
      if (typeof audioFrame.codectype === "undefined") {
        isFirstFrame = true;
      }
      audioFrame.codectype = data.codectype;
      if (data.codectype === 'G711') {
        audioFrame.audioSamplingRate = G7XX_SAMPLING_RATE;
        audioFrame.bitrate = G711_BITRATE;
      } else if (data.codectype === 'AAC') {
        audioFrame.audioSamplingRate = AAC_SAMPLING_RATE;
        audioFrame.bitrate = AAC_BITRATE;
      } else if (data.codectype === 'G726') {
        audioFrame.bitrate = data.bitrate * KILOBYTE;
        audioFrame.audioSamplingRate = G7XX_SAMPLING_RATE;
      }
      audioFrame.PESsize = data.PESsize;
      if (fileInfo === null) {
        fileInfo = {};
        fileInfo.pos = 4;
        fileInfo.tailSize = 0;
        sendMessageCallback('backupResult', {
          'errorCode': fromHex('0x0600'),
          'oldErrorCode': 0,
          'description': 'backup',
          'filename': fileName
        });
      }
      if (isFirstFrame === true) {
        createAviFile.initHeader('audio');
      }
    },
    /**
     * Update avi format using streamData(video) called by {@link backupProvider.onVideoData}
     * @function onVideoData
     * @memberof BackupSession
     * @instance
     * @param
     * @param {Uint8Array[]} streamData framePacket
     */
    onVideoData: function (frameInfo, streamData) {
      if (createAviFile === null) {
        return;
      }
      var header = null;
      var needToAddDummy = false;
      if (fileInfo === null && frameInfo.frameType !== 'I') {
        return;
      }
      if (frameInfo.frameType === 'P' && typeof frameInfo.width === 'undefined' &&
        typeof frameInfo.height === 'undefined') {
        frameInfo.width = fileInfo.width;
        frameInfo.height = fileInfo.height;
      }
      this.setVideoFrameInfo(frameInfo);

      if (this.checkMaxSize() === false) {
        header = createAviFile.updateInfo(frameInfo.type, videoFrame, fileInfo);
        if (header === null) {
          var errorCode = createAviFile.getErrorCode(frameInfo.type);
          if (errorCode < 0) {
            sendMessageCallback('backupResult', {
              'errorCode': fromHex('0x0605'),
              'oldErrorCode': errorCode,
              'description': 'backup',
              'filename': fileName
            });
            this.endSession();
            return;
          }
        }
        if (streamData.length < createAviFile.getChunkPayloadSize(frameInfo.type)) {
          needToAddDummy = true;
        }
      
        if (createAviFile === null) {
          return;
        }
        var videoIdxBuffer = createAviFile.getIdxBuffer(frameInfo.type);
        sendMessageCallback('backup', {
          'target': 'tailBody',
          'data': videoIdxBuffer
        });
        fileInfo.tailSize += videoIdxBuffer.length;

        sendMessageCallback('backup', {
          'target': 'body',
          'data': header
        });
        sendMessageCallback('backup', {
          'target': 'body',
          'data': streamData
        });
        if (needToAddDummy) {
          var dummyData = new Uint8Array(1);
          sendMessageCallback('backup', {
            'target': 'body',
            'data': dummyData
          });
          dummyData = null;
        }
        videoIdxBuffer = null;
      } else {
        return;
      }
    },
    /**
     * update avi format header using streamData. called by {@link BackupSession.receiveMessage}
     * @function onData
     * @memberof BackupSession
     * @instance
     * @param {Object} frameInfo frameData's info <br> passed by {@link videoWorker.eventVideoCallback} or {@link audioWorker.eventAudioCallback}
     * @param {Uinit8Array[]} streamData framepacket
     */
    onAudioData: function (frameInfo, streamData) {
      if (createAviFile === null) {
        return;
      }
      var header = null;
      if (fileInfo === null) {
        return;
      }
      this.setAudioFrameInfo(frameInfo);
      header = createAviFile.updateInfo(frameInfo.type, audioFrame, fileInfo);
      if (header === null) {
        var errorCode = createAviFile.getErrorCode(frameInfo.type);
        if (errorCode < 0) {
          sendMessageCallback('backupResult', {
            'errorCode': fromHex('0x0605'),
            'oldErrorCode': errorCode,
            'description': 'backup',
            'filename': fileName
          });
          this.endSession();
          return;
        }
      }
      if (this.checkMaxSize() === false) {
        if (createAviFile === null) {
          return;
        }
        var audioIdxBuffer = createAviFile.getIdxBuffer(frameInfo.type);
        sendMessageCallback('backup', {
          'target': 'tailBody',
          'data': audioIdxBuffer
        });
        fileInfo.tailSize += audioIdxBuffer.length;

        sendMessageCallback('backup', {
          'target': 'body',
          'data': header
        });
        sendMessageCallback('backup', {
          'target': 'body',
          'data': streamData
        });
        if (frameInfo.codectype === 'AAC' &&
          streamData.length < createAviFile.getChunkPayloadSize(frameInfo.type)) {
          var dummyData = new Uint8Array(1);
          sendMessageCallback('backup', {
            'target': 'body',
            'data': dummyData
          });
          dummyData = null;
        }
        audioIdxBuffer = null;
      } else {
        return;
      }
      if (!isPlayback && createAviFile.getDuration() >= 5 * 60) {
        sendMessageCallback('backupResult', {
          'errorCode': fromHex('0x0601'),
          'oldErrorCode': 1,
          'description': 'backup',
          'filename': fileName
        });
        this.endSession();
        return;
      }
    },
    /**
     * create Avi header
     * @function writeAviHeader
     * @memberof BackupSession
     * @instance
     */
    writeAviHeader: function () {
      var idxlen = 8 + fileInfo.tailSize;
      fileInfo.fileSize = HEADER_BYTES + fileInfo.pos - 4 + idxlen;
      var aviHeader = createAviFile.makeAviHeader(fileInfo.fileSize, fileInfo.pos);
      sendMessageCallback('backup', {
        'target': 'mainHeader',
        'data': aviHeader
      });
      aviHeader = null;
    },
    /**
     * create Avi tail Header
     * @function writeAviTail
     * @memberof BackupSession
     * @instance
     */
    writeAviTail: function () {
      var tailHeader = createAviFile.makeAviTail(fileInfo.tailSize);
      sendMessageCallback('backup', {
        'target': 'tailHeader',
        'data': tailHeader
      });
      tailHeader = null;
    },
    /**
     * start to make avi file
     * @function endSession
     * @memberof BackupSession
     * @instance
     */
    endSession: function () {
      if ( createAviFile === null) {
        return;
      }
      if (fileInfo === null) {
        sendMessageCallback('backupResult', {
          'errorCode': fromHex('0x0606'),
          'oldErrorCode': -3,
          'description': 'backup',
          'filename': fileName
        });
        return;
      }
      this.convertValidResolution();
      this.writeAviHeader();
      this.writeAviTail();
      sendMessageCallback('backup', {
        'target': 'save',
        'data': this.getFileName() + (createFileCount > 0 ? "_"+ (++createFileCount) : "")
      });
      if ( createAviFile.getErrorCode('video') === 0 &&
          createAviFile.getErrorCode('audio') === 0 ) {
        sendMessageCallback('backupResult', {
          'errorCode': fromHex('0x0601'),
          'oldErrorCode': 1,
          'description': 'backup',
          'filename': fileName
        });
      }
      close();
      console.log("Save called");
      fileInfo = null;
      createAviFile = null;
    },
    /**
     * get name of avi file
     * @function getFileName
     * @memberof BackupSession
     * @instance
     * @return avi file name
     */
    getFileName: function () {
      if (fileName === "") {
        return this.makeFileName();
      }
      return fileName;
    },
    /**
     * set name of avi file
     * @function setFileName
     * @memberof BackupSession
     * @instance
     * @param {String} name name of avi file
     */
    setFileName: function (name) {
      fileName = name;
    },
    /**
     * generate name of avi file
     * @function makeFileName
     * @memberof BackupSession
     * @instance
     * @return auto-generated file name (format is "'CodecType' 'Width'x'Height' 'CurrentTime')
     */
    makeFileName: function () {
      fileName = videoFrame.codectype + " " + videoFrame.width + "x" + videoFrame.height;
      if (typeof audioFrame.codectype !== 'undefined') {
        fileName += ' ' + audioFrame.codectype;
      }
      if (audioFrame.codectype === 'G726') {
        fileName += '_' + (audioFrame.bitrate / KILOBYTE);
      }
      var dt = new Date();
      fileName += "_" + dt.getFullYear() + "";
      fileName += (dt.getMonth()+1 < MIN_DOUBLE_FIGURES ?
                  "0" + (dt.getMonth() + 1) :
                  (dt.getMonth() + 1)) + "";
      fileName += (dt.getDate() < MIN_DOUBLE_FIGURES ?
                  "0" + dt.getDate() :
                  dt.getDate()) + "_";
      fileName += (dt.getHours() < MIN_DOUBLE_FIGURES ?
                  "0" + dt.getHours() :
                  dt.getHours()) + "";
      fileName += (dt.getMinutes() < MIN_DOUBLE_FIGURES ?
                  "0" + dt.getMinutes() :
                  dt.getMinutes()) + "";
      fileName += (dt.getSeconds() < MIN_DOUBLE_FIGURES ?
                  "0" + dt.getSeconds() :
                  dt.getSeconds());
      dt = null;
      return fileName;
    },
    /**
     * convert resolution to valid value.<br>
     * ex) when receiving resolution [1920x1088], convert to [1920x1080].
     * @function convertValidResolution
     * @memberof BackupSession
     * @instance
     */
    convertValidResolution: function () {
      /* eslint-disable no-magic-numbers */
      var specialWidth = [192, 368, 608, 1088, 1472, 1952, 3008];
      /* eslint-enable no-magic-numbers */
      var targetWidth = videoFrame.width;
      var targetHeight = videoFrame.height;
      var isDividedBy16 = {
        'width' : true,
        'height' : true,
      };
      for (var i in specialWidth) {
        if (targetWidth === specialWidth[i]) {
          isDividedBy16.width = false;
        }
        if (targetHeight === specialWidth[i]) {
          isDividedBy16.height = false;
        }
      }
      if (!isDividedBy16.width) {
        targetWidth -= 8;
      }
      if (!isDividedBy16.height) {
        targetHeight -= 8;
      }

      if (targetWidth !== videoFrame.width || targetHeight !== videoFrame.height) {
        createAviFile.setResolution(targetWidth, targetHeight, videoFrame.framerate);
      }
    }
  };

  return new Constructor();
};