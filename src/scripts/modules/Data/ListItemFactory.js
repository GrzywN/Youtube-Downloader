import ListItem from "./ListItem.js";

export default class ListItemFactory {
  createItems(results) {
    delete this.itemList;
    this.itemList = {};

    results.items.forEach((result) => {
      const item = new ListItem(result);
      if (item.id != null) this.itemList[item.id] = item;
    });
  }

  getItems() {
    return this.itemList;
  }
}
