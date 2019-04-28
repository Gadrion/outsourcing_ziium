/* exported AudioHeader */ 
/* global inheritObject, AviFormatWriter */
function AudioHeader() {
  "use strict";

  var SIZE_OF_CHUNK_HEADER = 8;

  var SIZE_OF_WAVE_FORMAT = 40;
  var SIZE_OF_STREAM_HEADER = 64;
  var MEDIASUBTYPE_RAW_AAC1 = 0x00FF;
  var AAC_PER_SAMPLE = 1024;
  var AAC_FORMAT_SIZE = 2;
  var AAC_BUF_SIZE = 8192;

  var WAVE_FORMAT_MULAW = 0x0007;
  var BITRATE = {
    '_16K' : 16000,
    '_24K' : 24000,
    '_32K' : 32000,
    '_40K' : 40000,
  };
  /* eslint-disable no-magic-numbers */
  function makeAudioConfig(samplerate, channels) {
    //AAC supported maximum 48kbps.

    // .....001 1....... = 48000
    // .....010 0....... = 44100
    // .....010 1....... = 32000
    // .....011 0....... = 24000
    // .....100 0....... = 16000
    // .....101 1....... =  8000

    // ........ .000 1... = 1 channel
    // ........ .001 0... = 2 channels
    // ........ .001 1... = 3 channels
    // ........ .010 0... = 4 channels
    // ........ .010 1... = 5 channels
    // ........ .011 0... = 6 channels
    // ........ .011 1... = 8 channels
    var bitcnt = 0;

    switch (samplerate) {
      case 48000:
        bitcnt |= 0x8001;
        break;
      case 44100:
        bitcnt |= 0x0002;
        break;
      case 32000:
        bitcnt |= 0x8002;
        break;
      case 24000:
        bitcnt |= 0x0003;
        break;
      case 16000:
        bitcnt |= 0x0004;
        break;
      case 8000:
        bitcnt |= 0x8005;
        break;
      default:
        return 0;
    }

    switch (channels) {
      case 1:
        bitcnt |= 0x0800;
        break;
      case 2:
        bitcnt |= 0x1000;
        break;
      case 3:
        bitcnt |= 0x1800;
        break;
      case 4:
        bitcnt |= 0x2000;
        break;
      case 5:
        bitcnt |= 0x2800;
        break;
      case 6:
        bitcnt |= 0x3000;
        break;
      case 8:
        bitcnt |= 0x3800;
        break;
      default:
        return 0;
    }
    //0x0010 : AAC-LC
    return (bitcnt | 0x0010);
  }
  /* eslint-enable no-magic-numbers */
  
  function Constructor() {}
  Constructor.prototype = inheritObject(new AviFormatWriter(), {
    /**
     * initialize audio header
     * @function : initHeader
     */
    initHeader: function (audioFrame) {
      var audioHeader = {},
        audioFormat = {};
      /* Audio stream header */
      audioHeader.aviFourCC = "strh";
      audioHeader.aviBytesCount = SIZE_OF_STREAM_HEADER - 8;
      audioHeader.aviQuality = -1;
      audioHeader.aviType = "";
      audioHeader.aviFlags = 0;
      audioHeader.aviInitialFrames = 0;
      audioHeader.aviHandler = "";
      audioHeader.aviScale = 0;
      audioHeader.aviRate = 0;
      audioHeader.aviSuggestedBufferSize = 0;
      audioHeader.aviLength = 0;
      audioHeader.aviSampleSize = 0;
      this.setStreamHeader(audioHeader);

      audioFormat.FourCC = "strf";
      audioFormat.BytesCount = SIZE_OF_WAVE_FORMAT - 8;
      audioFormat.Channels = 1;
      audioFormat.FormatTag = 0;
      audioFormat.SamplesPerSec = 0;
      audioFormat.AvgBytesPerSec = 0;
      audioFormat.BitsPerSample = 0;
      audioFormat.BlockAlign = 0;
      audioFormat.Size = 0;
      audioFormat.AudioConfig = 0;
      this.setStreamFormat(audioFormat);
    },
    /*
     * AAC audio setting
     * @function : settingAAC
     */
    settingAAC: function (audioFrame, fileInfo) {
      var audioHeader = this.getStreamHeader();
      audioHeader.aviQuality = 0;
      audioHeader.aviType = "auds";
      audioHeader.aviFlags = 1;
      audioHeader.aviInitialFrames = 0;
      audioHeader.aviScale = AAC_PER_SAMPLE;
      audioHeader.aviRate = audioFrame.audioSamplingRate;
      audioHeader.aviSuggestedBufferSize = AAC_BUF_SIZE;
      this.setStreamHeader(audioHeader);

      var audioFormat = this.getStreamFormat();
      var audioConfiguration = makeAudioConfig(audioFrame.audioSamplingRate, 1);
      audioFormat.FormatTag = MEDIASUBTYPE_RAW_AAC1;
      audioFormat.SamplesPerSec = audioFrame.audioSamplingRate;
      audioFormat.AvgBytesPerSec = audioFormat.Channels * (audioFrame.bitrate / 8);
      audioFormat.BitsPerSample = 16;
      audioFormat.BlockAlign = AAC_PER_SAMPLE;
      audioFormat.Size = AAC_FORMAT_SIZE;
      audioFormat.AudioConfig = audioConfiguration;
      this.setStreamFormat(audioFormat);
    },
    /*
     * G.711 audio setting
     * @function : settingG711
     */
    settingG711: function (audioFrame, fileInfo) {
      var audioHeader = this.getStreamHeader();
      audioHeader.aviQuality = 0;
      audioHeader.aviType = "auds";
      audioHeader.aviScale = 1;
      audioHeader.aviRate = 8000;
      audioHeader.aviSuggestedBufferSize = 8000;

      var audioFormat = this.getStreamFormat();
      audioFormat.FormatTag = WAVE_FORMAT_MULAW;
      audioFormat.SamplesPerSec = 8000;
      audioFormat.AvgBytesPerSec = 8000;
      audioFormat.BitsPerSample = 8;
      audioFormat.BlockAlign = 1;

      audioHeader.aviSampleSize = this.getAviSampleSize();

      this.setStreamHeader(audioHeader);
      this.setStreamFormat(audioFormat);
    },
    /*
     * G.726 audio setting
     * @function : settingG726
     */
    settingG726: function (audioFrame, fileInfo) {
      var audioHeader = this.getStreamHeader();
      var audioFormat = this.getStreamFormat();
      audioHeader.aviType = "auds";
      audioHeader.aviScale = 1;
      audioHeader.aviSampleSize = 2;
      if (audioFrame.bitrate === BITRATE._16K) {
        audioFormat.AvgBytesPerSec = audioHeader.aviRate = 2000;
        audioFormat.BitsPerSample = 2;
      } else if (audioFrame.bitrate === BITRATE._24K) {
        audioFormat.AvgBytesPerSec = audioHeader.aviRate = 3000;
        audioFormat.BitsPerSample = 3;
      } else if (audioFrame.bitrate === BITRATE._32K) {
        audioFormat.AvgBytesPerSec = audioHeader.aviRate = 4000;
        audioFormat.BitsPerSample = 4;
      } else if (audioFrame.bitrate === BITRATE._40K) {
        audioFormat.AvgBytesPerSec = audioHeader.aviRate = 5000;
        audioFormat.BitsPerSample = 5;
      }
      audioFormat.FormatTag = 0x0045;
      audioFormat.aviSuggestedBufferSize = audioHeader.aviRate;
      audioFormat.SamplesPerSec = 8000;
      audioFormat.BlockAlign = 1;
      this.setStreamHeader(audioHeader);
      this.setStreamFormat(audioFormat);
    },
    /*
     * setting audio config at first
     * @function : checkAudioFrameInfo
     */
    checkAudioFrameInfo: function (audioFrame, fileInfo) {
      //First setting audio config.
      if (typeof fileInfo.audioInit === "undefined" || fileInfo.audioInit === false) {
        if (audioFrame.codectype === 'AAC') {
          this.settingAAC(audioFrame, fileInfo);
        } else if (audioFrame.codectype === 'G711') {
          this.settingG711(audioFrame, fileInfo);
        } else if (audioFrame.codectype === 'G726') {
          this.settingG726(audioFrame, fileInfo);
        }
        fileInfo.audioInit = true;
        fileInfo.audioStrn = 0;
        fileInfo.audioBytes = 0;
        fileInfo.codectype = audioFrame.codectype;
        fileInfo.bitrate = audioFrame.bitrate;
        fileInfo.samplingRate = audioFrame.audioSamplingRate;
        return 0;
      } else { // check previous config
        if (fileInfo.codectype !== audioFrame.codectype) {
          return -1;
        }
        if (fileInfo.bitrate !== audioFrame.bitrate) {
          return -1;
        }
        if (fileInfo.samplingRate !== audioFrame.audioSamplingRate) {
          return -1;
        }
      }
      return 0;
    },
    /*
     * update received audio frame's info
     * @function : updateInfo
     */
    updateInfo: function (audioFrame, fileInfo) {
      var audioHeader = this.getStreamHeader();
      var aviIndexEntry = this.getIndexEntry();
      var size = audioFrame.PESsize;
      if (size % 2 !== 0) {
        size += 1;
      }
      aviIndexEntry.flag = 0x10;
      aviIndexEntry.chid = '01wb';
      if (this.checkAudioFrameInfo(audioFrame, fileInfo) !== 0) {
        this.setErrorCode(-1); //BACKUP_STATUS.CODEC_CHANGED
        console.error("check Audio Frame info failed!!!!!");
        return null;
      }
      if (audioFrame.codectype === 'AAC') {
        this.settingAAC(audioFrame, fileInfo);
        audioHeader.aviLength = ++fileInfo.audioStrn;
      } else if (audioFrame.codectype === 'G711' || audioFrame.codectype === 'G726') {
        if (audioFrame.codectype === 'G711') {
          this.settingG711(audioFrame, fileInfo);
        } else {
          this.settingG726(audioFrame, fileInfo);
        }
        fileInfo.audioBytes += size;
        audioHeader.aviLength = fileInfo.audioBytes / this.getAviSampleSize();
      }

      aviIndexEntry.offset = fileInfo.pos;
      aviIndexEntry.size = size;
      aviIndexEntry.dummycount = 0;

      fileInfo.pos = this.aviIndexEntry.offset + SIZE_OF_CHUNK_HEADER + size;
      this.chunkHeader.fourcc = this.aviIndexEntry.chid;
      this.chunkHeader.payloadsize = size;
      this.writeChunkHeader();
      this.setChunkHeader(this.chunkHeader);
      this.setStreamHeader(audioHeader);
      this.setIndexEntry(aviIndexEntry);
      return this.buffer;
    },
  });
  return new Constructor();
}