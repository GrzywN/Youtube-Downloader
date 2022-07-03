import ListItem from './ListItem.js';

export default class ListItemFactory {
  createItems(results) {
    delete this.itemList;
    this.itemList = {};

    for (const result of results.items) {
      const item = new ListItem(result);
      if (item.id != null) this.itemList[item.id] = item;
    }
  }

  getItems() {
    return this.itemList;
  }
}
