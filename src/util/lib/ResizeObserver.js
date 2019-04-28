import ResizeObserverPolyFill from 'resize-observer-polyfill';

class ResizeObserver {
  constructor() {
    this.ro = new ResizeObserverPolyFill(entries => { // observer
      entries.map(entry => {
        if (entry.target.handleResize) {
          entry.target.handleResize(entry);
        }
        return null;
      });
    });
  }

  observe = element => {
    this.ro.observe(element);
  }
}

export default new ResizeObserver();
