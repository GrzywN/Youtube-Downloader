const { createWriteStream } = require('fs');
const fs = require('fs');
const ytdl = require('ytdl-core');

class DOMElements {
  static input = document.getElementById('youtube-url');
  static download = document.getElementById('download-btn');
  static addToList = document.getElementById('add-to-list-btn');
  static list = document.getElementById('list');
}

class Downloader {
  constructor(DOMElements) {
    this.init();
    this.linkList = [];
  }

  init() {
    this.setListeners();
  }

  setListeners() {
    DOMElements.download.addEventListener('click', this.downloadHandler.bind(this));
    DOMElements.addToList.addEventListener('click', this.addToListHandler.bind(this));
  }

  downloadHandler() {
    if (this.linkList.length > 0) {
      this.linkList.forEach(video => {
        video.download();
      });
    }
  }

  addToListHandler() {
    const url = DOMElements.input.value;

    if (ytdl.validateURL(url)) {
      const video = new Video(url);
      video.addToList();
      this.linkList.push(video);
    }
  }
}

class Video {
  constructor(url) {
    this.url = url;
    this.id = Video.getID(url);
    console.log(this.id);
  }

  static getID(url) {
    return ytdl.getURLVideoID(url);
  }

  download() {
    ytdl(this.url).pipe(createWriteStream(`${this.id}.mp4`));
  }

  addToList() {
    DOMElements.list.appendChild(this.createListItem());
  }

  createListItem() {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${this.url}">${this.url}</a>`;
    return li;
  }
}

const downloader = new Downloader();
