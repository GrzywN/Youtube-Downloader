export default class GlobalButtonsUI {
  constructor({ downloadAll, addResultsToQueue, clearQueue }) {
    this.downloadAll = document.querySelector(downloadAll);
    this.addResultsToQueue = document.querySelector(addResultsToQueue);
    this.clearQueue = document.querySelector(clearQueue);

    this.validateSelectors();

    this.#setListeners();
    this.subscribers = [];
  }

  validateSelectors() {
    const errorArray = [];

    if (this.downloadAll == null) {
      errorArray.push("downloadAll element not found");
    }

    if (this.addResultsToQueue == null) {
      errorArray.push("addResultsToQueue element not found");
    }

    if (this.clearQueue == null) {
      errorArray.push("clearQueue element not found");
    }

    if (
      this.downloadAll == null ||
      this.addResultsToQueue == null ||
      this.clearQueue == null
    ) {
      const errorString = `${this.constructor.name}: ${errorArray.join(", ")}`;

      globalThis.notificationUI.createError(errorString);
      throw new Error(errorString);
    }
  }

  #setListeners() {
    this.downloadAll.onclick = this.#notify.bind(this, "DOWNLOAD_ALL");
    this.addResultsToQueue.onclick = this.#notify.bind(
      this,
      "ADD_RESULTS_TO_QUEUE"
    );
    this.clearQueue.onclick = this.#notify.bind(this, "CLEAR_THE_QUEUE");
  }

  #notify(type) {
    this.subscribers.forEach((subscriber) => subscriber(type));
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }
}
