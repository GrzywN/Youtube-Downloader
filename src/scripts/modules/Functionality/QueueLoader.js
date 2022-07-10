/* eslint-disable class-methods-use-this */

const { ipcRenderer } = require("electron");

export default class QueueLoader {
  constructor() {
    this.loadedQueue = {};
  }

  getList() {
    return this.loadedQueue;
  }

  getValueList() {
    return Object.values(this.loadedQueue);
  }

  save(currentQueue) {
    ipcRenderer.send("saveQueue", currentQueue);
  }

  load() {
    this.clearPrevious();

    const queue = QueueLoader.sendDialog();
    if (queue instanceof Error) return;

    this.set(queue);
  }

  clearPrevious() {
    delete this.loadedQueue;
    this.loadedQueue = {};
  }

  static sendDialog() {
    return ipcRenderer.sendSync("loadQueue");
  }

  set(queue) {
    this.loadedQueue = QueueLoader.filter(queue);
  }

  static filter(parsedJson) {
    const filteredQueue = {};

    const parsedJsonArray = Object.keys(parsedJson);

    parsedJsonArray.forEach((key) => {
      if (QueueLoader.verifyItem(parsedJson[key])) {
        filteredQueue[key] = parsedJson[key];
      }
    });

    return filteredQueue;
  }

  static verifyItem(item) {
    if (
      typeof item.title === "string" &&
      typeof item.thumbnailURL === "object" &&
      typeof item.duration === "string" &&
      typeof item.id === "string" &&
      typeof item.url === "string" &&
      typeof item.type === "string" &&
      typeof item.isLive === "boolean" &&
      typeof item.isUpcoming === "boolean" &&
      typeof item.enabled === "boolean"
    ) {
      return true;
    }
    return false;
  }
}
