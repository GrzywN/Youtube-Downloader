export default class QueueList {
  constructor() {
    this.list = {};
  }

  isOnQueue(item) {
    return this.list[item.id] != null;
  }

  addItem(item) {
    const itemCopy = QueueList.#getCopiedObject(item);
    this.list[item.id] = itemCopy;
  }

  getItemFromID(id) {
    return this.list[id];
  }

  removeItem(item) {
    delete this.list[item.id];
  }

  getList() {
    return this.list;
  }

  getValueList() {
    return Object.values(this.list);
  }

  static #getCopiedObject(object) {
    return JSON.parse(JSON.stringify(object));
  }
}
