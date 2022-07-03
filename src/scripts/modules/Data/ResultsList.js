export default class ResultsList {
  update(list) {
    delete this.list;
    const copiedList = ResultsList.#getCopiedObject(list);
    this.list = copiedList;
  }

  getList() {
    return this.list;
  }

  getValueList() {
    return Object.values(this.list);
  }

  getItemFromID(id) {
    const listArray = Object.values(this.list);
    let itemToReturn = null;

    listArray.forEach((item) => {
      if (item.id === id) {
        itemToReturn = item;
      }
    });

    return itemToReturn;
  }

  static #getCopiedObject(object) {
    return JSON.parse(JSON.stringify(object));
  }
}
