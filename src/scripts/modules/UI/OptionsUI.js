export default class OptionsUI {
  constructor({ formatSelect, selectPath, loadQueue, saveQueue }) {
    this.formatSelect = document.querySelector(formatSelect);
    this.selectPath = document.querySelector(selectPath);
    this.loadQueue = document.querySelector(loadQueue);
    this.saveQueue = document.querySelector(saveQueue);

    this.validateSelectors();

    this.#setListeners();
    this.subscribers = [];
  }

  validateSelectors() {
    const errorArray = [];

    if (this.formatSelect == null) {
      errorArray.push('formatSelect element not found');
    }

    if (this.selectPath == null) {
      errorArray.push('selectPath element not found');
    }

    if (this.loadQueue == null) {
      errorArray.push('loadQueue element not found');
    }

    if (this.saveQueue == null) {
      errorArray.push('saveQueue element not found');
    }

    if (
      this.formatSelect == null ||
      this.selectPath == null ||
      this.loadQueue == null ||
      this.saveQueue == null
    ) {
      const errorString = `${this.constructor.name}: ${errorArray.join(', ')}`;

      globalThis.notificationUI.createError(errorString);
      throw new Error(errorString);
    }
  }

  #setListeners() {
    this.formatSelect.onchange = this.#notify.bind(this, 'CHANGE_FORMAT');
    this.selectPath.onclick = this.#notify.bind(this, 'SELECT_PATH');
    this.loadQueue.onclick = this.#notify.bind(this, 'LOAD_QUEUE');
    this.saveQueue.onclick = this.#notify.bind(this, 'SAVE_QUEUE');
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
