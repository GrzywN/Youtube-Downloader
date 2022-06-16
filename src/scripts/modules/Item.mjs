import ListRenderer from './ListRenderer.mjs';

const ytdl = require('ytdl-core');
const fs = require('fs');

class Item {
  constructor(url, linkList) {
    this.url = url;
    this.linkList = linkList;
  }

  async getData() {
    return ytdl.getInfo(this.url);
  }

  download() {
    this.data = this.getData();
    this.data.then(data => {
      ytdl(this.url).pipe(fs.createWriteStream(`${data.videoDetails.title}.mp4`));
    });
  }

  addToList() {
    this.data = this.getData();
    ListRenderer.linkList = this.linkList;
    this.data.then(
      data => ListRenderer.renderElementInList(data),
      err => console.log(err)
    );
  }

  createListItem() {
    const element = document.createElement('div');
    element.innerHTML = `<a href="${this.url}">${this.url}</a>`;
    return element;
  }

  removeFromList(id) {
    ListRenderer.removeElement(id);
  }
}

export default Item;
