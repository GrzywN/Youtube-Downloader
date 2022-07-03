const { ipcRenderer } = require('electron');

export default class QueueLoader {
  constructor() {
    this.loadedQueue = {};
  }

  get() {
    return this.loadedQueue;
  }

  save(currentQueue) {
    ipcRenderer.send('saveQueue', currentQueue);
  }

  load() {
    this.#clearPrevious();

    let queue = this.#sendDialog();
    if (queue instanceof Error) return;

    this.#set(queue);
  }

  #clearPrevious() {
    delete this.loadedQueue;
    this.loadedQueue = {};
  }

  #sendDialog() {
    return ipcRenderer.sendSync('loadQueue');
  }

  #set(queue) {
    this.loadedQueue = this.#filter(queue);
  }

  #filter(parsedJson) {
    let filteredQueue = {};

    for (const key in parsedJson) {
      if (this.#verifyItem(parsedJson[key])) {
        filteredQueue[key] = parsedJson[key];
      }
    }
    return filteredQueue;
  }

  #verifyItem(item) {
    if (
      typeof item.title === 'string' &&
      typeof item.thumbnailURL === 'object' &&
      typeof item.duration === 'string' &&
      typeof item.id === 'string' &&
      typeof item.url === 'string' &&
      typeof item.type === 'string' &&
      typeof item.isLive === 'boolean' &&
      typeof item.isUpcoming === 'boolean' &&
      typeof item.enabled === 'boolean'
    ) {
      return true;
    }
    return false;
  }
}
