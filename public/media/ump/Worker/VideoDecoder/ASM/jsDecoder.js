/**
 * JSDecoder
 * @class JSDecoder
 */
function JSDecoder(codecType) {
	"use strict";
	//decoder function variables
	var initDecoder;
	var decoderContext;
	var decodeByFFMPEG;
	var closeContext;
	var iFrameCheck = false;

	//common variables
	var context = null;
	var outpic = new Uint8Array();
	var ID = (codecType === "H264" ? 264 : 265);

	function Constructor() {
		console.log('Construct H' + ID + ' Codec');

		// initialize ffmpeg decoder
		initDecoder = Module.cwrap('init_jsFFmpeg', 'void', []);
		decoderContext = Module.cwrap('context_jsFFmpeg', 'number', ['number']);
		decodeByFFMPEG = Module.cwrap('decode_video_jsFFmpeg', 'number', ['number', 'array', 'number', 'number', 'number']);
		closeContext = Module.cwrap('close_jsFFmpeg', 'number', ['number']);

		initDecoder();

		Constructor.prototype.init();
	}

	Constructor.prototype = {
		/**
		 * This function set channel jsDecoder(asm.js decoder).
		 * @function setChannel
		 * @memberof JSDecoder
		 * @example
		 *     example: jsDecoder.setChannel(0);
		 */
		setChannel: function(channel) {
			Constructor.prototype.channelId = channel;
		},
		/**
		 * This function get channel jsDecoder(asm.js decoder).
		 * @function getChannel
		 * @memberof JSDecoder
		 * @example
		 *     example: var channelId = jsDecoder.getChannel();
		 */
		getChannel: function() {
			return Constructor.prototype.channelId;
		},		
		/**
		 * This function is init jsDecoder(asm.js decoder).
		 * @function init
		 * @memberof JSDecoder
		 * @example
		 *     example: jsDecoder.init();
		 */
		init: function () {
			console.log("H" + ID + " Decoder init");
			if (context !== null) {
				closeContext(context);
				context = null;
			}
			context = decoderContext(ID);
		},
		/**
		 * This function is setting frame output size.
		 * @function setOutputSize
		 * @memberof JSDecoder
		 * @example
		 *     example: jsDecoder.init();
		 */
		setOutputSize: function (size) {
			console.log("H" + ID + " Decoder setOutputSize");
			var outpicsize = size * 1.5;
			var outpicptr = Module._malloc(outpicsize);
			outpic = new Uint8Array(Module.HEAPU8.buffer, outpicptr, outpicsize);
		},
		/**
		 * This function is decode frame.
		 * @function setOutputSize
		 * @memberof JSDecoder
		 * @example
		 *     example: jsDecoder.init();
		 */
		decode: function (data) {
			if (context === null) return null;

			if (iFrameCheck === true || (data.frameType === "I")) {
				iFrameCheck = true;
				var interval = 0;
				// var beforeDecoding = Date.now();
				decodeByFFMPEG(context, data.frameData, data.frameData.length, outpic.byteOffset, interval);
				console.log("interval", interval);
				// var decodingTime = Date.now() - beforeDecoding;
				var copyOutput = new Uint8Array(outpic);
				return copyOutput;
			} else {
				return null;
			}
		}
	};

	return new Constructor();
}