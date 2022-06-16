import DOMElements from './DOMElements.mjs';
import Item from './Item.mjs';

const ytdl = require('ytdl-core');

class Downloader {
  constructor(DOMElements) {
    this.init();
    this.linkList = {};
  }

  init() {
    this.setListeners();
  }

  setListeners() {
    DOMElements.download.addEventListener('click', this.downloadHandler.bind(this));
    DOMElements.addToList.addEventListener('click', this.addToListHandler.bind(this));
    DOMElements.downloadAll.addEventListener('click', this.downloadAllHandler.bind(this));
    DOMElements.clearTheList.addEventListener('click', this.clearTheListHandler.bind(this));
  }

  downloadHandler() {
    const url = DOMElements.input.value;

    if (ytdl.validateURL(url)) {
      const item = new Item(url);
      item.download();
    }
  }

  addToListHandler() {
    const url = DOMElements.input.value;

    if (ytdl.validateURL(url)) {
      const id = ytdl.getURLVideoID(url);
      if (this.linkList[id] != null) {
        alert('This video is already in list');
      } else {
        const item = new Item(url, this.linkList);
        item.addToList();
        this.linkList[id] = item;
      }
    }
  }

  downloadAllHandler() {
    for (const key in this.linkList) {
      this.linkList[key].download();
    }
  }

  clearTheListHandler() {
    for (const key in this.linkList) {
      this.linkList[key].removeFromList(key);
    }
  }
}

export default Downloader;
