/**
 * AssemblyDecoder
 * @class AssemblyDecoder
 */
function AssemblyDecoder(codecType) {
	"use strict";
	//decoder function variables
	var initDecoder;
	var decoderContext;
	var decodeByFFMPEG;
	var closeContext;
	var iFrameCheck = false;
	var outpicsize;

	var checkPerformance = false;
	//common variables
	var context = null;
	var ID = (codecType === "H264" ? 264 : 265);

	Module.onRuntimeInitialized = function () {
		initDecoder = Module.cwrap('init_jsFFmpeg', 'void', []);
		decoderContext = Module.cwrap('context_jsFFmpeg', 'number', ['number']);
		if (checkPerformance) {
			decodeByFFMPEG = Module.cwrap('decode_video_jsFFmpeg', 'number', ['number', 'array', 'number', 'number', 'number']);
		} else {
			decodeByFFMPEG = Module.cwrap('decode_video_jsFFmpeg', 'number', ['number', 'array', 'number', 'number']);
		}
		closeContext = Module.cwrap('close_jsFFmpeg', 'number', ['number']);
		initDecoder();

		Constructor.prototype.init();
		Constructor.prototype.setOutputSize(0);
	};

	function Constructor() {
		console.log('Construct H' + ID + ' Codec');

		fetch('./WASM/ffmpeg.wasm')
			.then(function (response) {
				return response.arrayBuffer();
			})
			.then(function (buffer) {
				Module.wasmBinary = buffer;
			});
	}

	Constructor.prototype = {
		/**
		 * This function set channel AssemblyDecoder(asm.js decoder).
		 * @function setChannel
		 * @memberof AssemblyDecoder
		 * @example
		 *     example: AssemblyDecoder.setChannel(0);
		 */
		setChannel: function(channel) {
			Constructor.prototype.channelId = channel;
		},
		/**
		 * This function get channel information from AssemblyDecoder(asm.js decoder).
		 * @function getChannel
		 * @memberof AssemblyDecoder
		 * @example
		 *     example: var channelId = AssemblyDecoder.getChannel();
		 */
		getChannel: function() {
			return Constructor.prototype.channelId;
		},
		/**
		 * This function initialize the AssemblyDecoder(asm.js decoder).
		 * @function init
		 * @memberof AssemblyDecoder
		 * @example
		 *     example: AssemblyDecoder.init();
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
		 * This function close the AssemblyDecoder(asm.js decoder).
		 * @function close
		 * @memberof AssemblyDecoder
		 * @example
		 *     example: AssemblyDecoder.init();
		 */
		close: function() {
			console.log("H" + ID + " Decoder close");
			if (context !== null) {
				closeContext(context);
				context = null;
				console.log("close webassembly codec context")
			}
		},
		/**
		 * This function is setting frame output size.
		 * @function setOutputSize
		 * @memberof AssemblyDecoder
		 * @example
		 *     example: AssemblyDecoder.init();
		 */
		setOutputSize: function (size) {
			console.log("H" + ID + " Decoder setOutputSize");

			if (size > 0) {
				//outpicsize = size * 1.5;
				outpicsize = size;
			}
		},
		/**
		 * This function is decode frame.
		 * @function setOutputSize
		 * @memberof AssemblyDecoder
		 * @example
		 *     example: AssemblyDecoder.init();
		 */
		decode: function (data) {
			if (context === null) return null;

			if (iFrameCheck === true || (data.frameType === "I")) {
				iFrameCheck = true;

				if (context !== null) {
					var outpicptr = Module._malloc(outpicsize);
					var outpic = new Uint8Array(Module.HEAPU8.buffer, outpicptr, outpicsize);	

					// check decoding performance from webassembly
					if (checkPerformance) {
						var intervalPtr = Module._malloc(4);
						var dataHeap = new Uint8Array(Module.HEAPU8.buffer, intervalPtr, 1);
						decodeByFFMPEG(context, data.frameData, data.frameData.length, outpic.byteOffset, dataHeap.byteOffset);
						var interval = new Uint32Array(dataHeap);
						console.log("decoding interval: ", interval[0]);

						Module._free(dataHeap.byteOffset);
					} else {
						decodeByFFMPEG(context, data.frameData, data.frameData.length, outpic.byteOffset);
					}
					var copyOutput = new Uint8Array(outpic);
					Module._free(outpic.byteOffset);

					return copyOutput;
				}	else {
					throw new umpError({
						errorCode: fromHex('0x0904'),
						place: 'assemblyDecoder.js:110',
						message: "Video Context is not exist for FFMpeg"
					});
					return null;
				}
			} else {
				return null;
			}
		}
	};

	return new Constructor();
}