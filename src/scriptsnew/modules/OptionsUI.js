export default class OptionsUI {
  constructor({ formatSelect, selectPath, loadQueue, saveQueue }) {
    this.formatSelectEl = document.querySelector(formatSelect);
    this.selectPathEl = document.querySelector(selectPath);
    this.loadQueueEl = document.querySelector(loadQueue);
    this.saveQueueEl = document.querySelector(saveQueue);

    this.#setListeners();
    this.subscribers = [];
  }

  #setListeners() {
    this.formatSelectEl.onchange = this.#sendEvent.bind(this, 'CHANGE_FORMAT');
    this.selectPathEl.onclick = this.#sendEvent.bind(this, 'SELECT_PATH');
    this.loadQueueEl.onclick = this.#sendEvent.bind(this, 'LOAD_QUEUE');
    this.saveQueueEl.onclick = this.#sendEvent.bind(this, 'SAVE_QUEUE');
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
