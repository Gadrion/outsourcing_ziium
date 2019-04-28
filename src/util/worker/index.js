import cameraListWorker from './CameraListUpdateWorker';
import eventWorker from './EventUpdateWorker';

class WebWorker {
  constructor(worker) {
    const code = worker.toString();
    const blob = new Blob([`(${code})()`]);
    return new Worker(URL.createObjectURL(blob));
  }
}

const CameraListUpdateWorker = new WebWorker(cameraListWorker);
const EventUpdateWorker = new WebWorker(eventWorker);

export {
  CameraListUpdateWorker,
  EventUpdateWorker,
};
