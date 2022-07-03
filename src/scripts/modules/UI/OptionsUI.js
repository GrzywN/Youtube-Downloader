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
    this.formatSelectEl.onchange = this.#notify.bind(this, 'CHANGE_FORMAT');
    this.selectPathEl.onclick = this.#notify.bind(this, 'SELECT_PATH');
    this.loadQueueEl.onclick = this.#notify.bind(this, 'LOAD_QUEUE');
    this.saveQueueEl.onclick = this.#notify.bind(this, 'SAVE_QUEUE');
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
