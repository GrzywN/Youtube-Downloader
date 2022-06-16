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

  removeFromList(id) {
    delete this.linkList[id];
  }
}

export default Downloader;
