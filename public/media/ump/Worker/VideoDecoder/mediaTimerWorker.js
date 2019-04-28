var start_time;
var end_time;
onmessage = function(event) {
  var interval;

  if(typeof event.data.interval !== 'string') {
    interval = "" + event.data.interval;
  } else {
    interval = event.data.interval;
  }

  //start_time = Math.floor(new Date().valueOf());
  start_time = performance.now();

  //console.log("start time: " + start_time + ", interval: " + event.data.interval);

  startTimer(interval);
};

function timeTrigger(){
    //end_time = Math.floor(new Date().valueOf());
    end_time = performance.now();
    timer = {
        interval: (end_time - start_time)
    };
    postMessage(timer);

    //console.log("end time: " + end_time + ", interval: " + timer.interval);
    start_time = end_time;
}

function startTimer(interval) {
  // Call sendMsgToMain method again after 5seconds
  setInterval(timeTrigger, interval);
}