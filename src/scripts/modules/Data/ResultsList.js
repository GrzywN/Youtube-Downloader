export default class ResultsList {
  update(list) {
    delete this.list;
    const copiedList = ResultsList.#getCopiedObject(list);
    this.list = copiedList;
  }

  getList() {
    return this.list;
  }

  getItemFromID(id) {
    for (const item in this.list) {
      if (this.list[item].id == id) return this.list[item];
    }
    return null;
  }

  static #getCopiedObject(object) {
    return JSON.parse(JSON.stringify(object));
  }
}
