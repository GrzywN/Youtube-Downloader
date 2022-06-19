import DOMElements from './Utility/DOMElements.mjs';
import Globals from './Utility/Globals.mjs';
import QueueList from './QueueList.mjs';

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
    Downloader.currentPath = ipcRenderer.sendSync('getAppPath') + '/downloads';
  }

  static selectPath() {
    ipcRenderer.send('selectDirectory');
  }

  static download(queueItem) {
    if (DOMElements.formatSelect.value === Globals.AUTO_STR) Downloader.downloadVideo(queueItem);
    if (DOMElements.formatSelect.value === Globals.AUDIO_STR) Downloader.downloadAudio(queueItem);
  }

  static downloadVideo(queueItem) {
    queueItem.stream = ytdl(`${queueItem.url}`, {
      filter: format => format.container === 'mp4',
    });

    // There might be bugs in this function with title's edge cases.
    const filename = queueItem.title.replaceAll('\\', '').replaceAll('/', '');
    queueItem.stream.pipe(createWriteStream(`${Downloader.currentPath}/${filename}.mp4`));
  }

  static downloadAudio(queueItem) {
    queueItem.stream = ytdl(`${queueItem.url}`, {
      quality: 'highestaudio',
    });

    const filename = queueItem.title.replaceAll('\\', '').replaceAll('/', '');
    ffmpeg(queueItem.stream).audioBitrate(320).save(`${Downloader.currentPath}/${filename}.mp3`);

    // In case of implementing progress bar

    // .on('progress', p => {
    //   readline.cursorTo(process.stdout, 0);
    //   process.stdout.write(`${p.targetSize}kb downloaded`);
    // })
    // .on('end', () => {
    //   console.log('download ended');
    // });
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

// TODO: add dropdown support (auto / audio)
// TODO: sprawdzic czy po ID jest szybciej niz po url (pobieranie)
