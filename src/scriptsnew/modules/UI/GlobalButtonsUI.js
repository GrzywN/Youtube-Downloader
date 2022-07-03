export default class GlobalButtonsUI {
  constructor({ downloadAll, addResultsToQueue, clearQueue }) {
    this.downloadAllEl = document.querySelector(downloadAll);
    this.addResultsToQueueEl = document.querySelector(addResultsToQueue);
    this.clearQueueEl = document.querySelector(clearQueue);
    this.#addGlobalListeners();
    this.subscribers = [];
  }

  #addGlobalListeners() {
    this.downloadAllEl.onclick = this.#sendEvent.bind(this, 'DOWNLOAD_ALL');
    this.addResultsToQueueEl.onclick = this.#sendEvent.bind(this, 'ADD_RESULTS_TO_QUEUE');
    this.clearQueueEl.onclick = this.#sendEvent.bind(this, 'CLEAR_THE_QUEUE');
  }

  #sendEvent(type) {
    for (const callback of this.subscribers) {
      callback(type);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }
}
