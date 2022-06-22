export default class ResultsList {
  update(list) {
    delete this.list;
    const copiedList = ResultsList.getCopiedObject(list);
    this.list = copiedList;
  }

  getList() {
    return this.list;
  }

  static getCopiedObject(object) {
    return JSON.parse(JSON.stringify(object));
  }
}
