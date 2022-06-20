/* eslint-disable no-restricted-syntax */
import DOMElements from './Utility/DOMElements.js';
import Globals from './Utility/Globals.js';
import QueueList from './QueueList.js';
import DownloadProgress from './DownloadProgress.js';

const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

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

    DOMElements.downloadAll.addEventListener('click', Downloader.downloadAll.bind(this));
  }

  static setDefaultPath() {
    Downloader.currentPath = `${ipcRenderer.sendSync('getAppPath')}/downloads`;
  }

  static selectPath() {
    ipcRenderer.send('selectDirectory');
  }

  static download(queueItem) {
    if (DOMElements.formatSelect.value === Globals.VIDEO_AUDIO_STR)
      Downloader.downloadVideo(queueItem);
    if (DOMElements.formatSelect.value === Globals.AUDIO_STR) Downloader.downloadAudio(queueItem);
  }

  static downloadVideo(queueItem) {
    const stream = ytdl(`${queueItem.url}`, {
      filter: (format) => format.container === 'mp4',
    });

    // There might be bugs in this function with title name edge cases.
    const filename = queueItem.title.replaceAll('\\', '').replaceAll('/', '');
    stream.pipe(createWriteStream(`${Downloader.currentPath}/${filename}.mp4`));

    DownloadProgress.registerProgress(queueItem, stream);
  }

  static downloadAudio(queueItem) {
    const stream = ytdl(`${queueItem.url}`, {
      quality: 'highestaudio',
    });

    const filename = queueItem.title.replaceAll('\\', '').replaceAll('/', '');
    ffmpeg(stream).audioBitrate(320).save(`${Downloader.currentPath}/${filename}.mp3`);

    DownloadProgress.registerProgress(queueItem, stream);
  }

  static downloadAll() {
    const isEmpty = Object.keys(QueueList.queueList).length === 0;
    if (isEmpty) return;

    for (const queueItem of Object.values(QueueList.queueList)) {
      Downloader.download(queueItem);
    }
  }
}

export default Downloader;
