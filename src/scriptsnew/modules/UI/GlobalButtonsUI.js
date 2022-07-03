export default class GlobalButtonsUI {
  constructor({ downloadAll, addResultsToQueue, clearQueue }) {
    this.downloadAllEl = document.querySelector(downloadAll);
    this.addResultsToQueueEl = document.querySelector(addResultsToQueue);
    this.clearQueueEl = document.querySelector(clearQueue);
    this.#addGlobalListeners();
    this.subscribers = [];
  }

  #addGlobalListeners() {
    this.downloadAllEl.onclick = this.#notify.bind(this, 'DOWNLOAD_ALL');
    this.addResultsToQueueEl.onclick = this.#notify.bind(this, 'ADD_RESULTS_TO_QUEUE');
    this.clearQueueEl.onclick = this.#notify.bind(this, 'CLEAR_THE_QUEUE');
  }

  #notify(type) {
    this.subscribers.forEach((subscriber) => subscriber(type));
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }
}
