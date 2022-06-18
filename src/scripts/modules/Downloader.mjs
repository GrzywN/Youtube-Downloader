import DOMElements from './Utility/DOMElements.mjs';

const ytdl = require('ytdl-core');
const { ipcRenderer } = require('electron');
const { createWriteStream } = require('fs');

class Downloader {
  constructor() {
    throw new Error('This class cannot be instantiated');
  }

  static currentPath;

  static init() {
    Downloader.setListeners();
    Downloader.setDefaultPath();
  }

  static setListeners() {
    DOMElements.selectPath.addEventListener('click', Downloader.selectPath.bind(this));

    ipcRenderer.on('pathChange', (event, path) => {
      Downloader.currentPath = path;
    });
  }

  static setDefaultPath() {
    Downloader.currentPath = ipcRenderer.sendSync('getAppPath') + '/downloads';
  }

  static selectPath() {
    ipcRenderer.send('selectDirectory');
  }

  static download(queueItem) {
    queueItem.stream = ytdl(`${queueItem.url}`, {
      filter: format => format.container === 'mp4',
    });

    // There might be bugs in this function with title's edge cases.
    const filename = queueItem.title.replaceAll('\\', '').replaceAll('/', '');
    queueItem.stream.pipe(createWriteStream(`${Downloader.currentPath}/${filename}.mp4`));
  }
}

export default Downloader;

// TODO: add dropdown support (auto / audio)
