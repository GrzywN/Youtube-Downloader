/* eslint-disable import/no-extraneous-dependencies */

const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

const { ipcRenderer } = require('electron');
const { createWriteStream } = require('fs');

const VIDEO_AUDIO_STR = 'Video & Audio';
const AUDIO_STR = 'Audio only';

export default class Downloader {
  constructor(formatSelectSelector) {
    this.formatSelectElement = document.querySelector(formatSelectSelector);
    this.currentPath = Downloader.#getDefaultPath();
    this.#setIpcListener();
    this.selectedFormat = VIDEO_AUDIO_STR;
    this.subscribers = [];
  }

  static #getDefaultPath() {
    return `${ipcRenderer.sendSync('getAppPath')}/downloads`;
  }

  #setIpcListener() {
    ipcRenderer.on('pathChange', (event, path) => {
      this.currentPath = path;
    });
  }

  updateSelectedFormat() {
    this.selectedFormat = this.formatSelectElement.value;
  }

  static setPath() {
    ipcRenderer.send('selectDirectory');
  }

  download(item) {
    if (this.selectedFormat === VIDEO_AUDIO_STR) {
      this.#downloadVideo(item);
    } else if (this.selectedFormat === AUDIO_STR) {
      this.#downloadAudio(item);
    } else {
      throw new Error('Downloader: Invalid format');
    }
  }

  #downloadVideo(item) {
    const stream = ytdl(item.id, {
      filter: (format) => format.container === 'mp4',
    });

    const filename = item.title.replaceAll('\\', '').replaceAll('/', '');
    stream.pipe(createWriteStream(`${this.currentPath}/${filename}.mp4`));

    const { id } = item;
    this.#notify(id, stream);
  }

  #downloadAudio(item) {
    const stream = ytdl(`${item.url}`, {
      quality: 'highestaudio',
    });

    const filename = item.title.replaceAll('\\', '').replaceAll('/', '');
    ffmpeg(stream).audioBitrate(320).save(`${this.currentPath}/${filename}.mp3`);

    const { id } = item;
    this.#notify(id, stream);
  }

  #notify(id, stream) {
    this.subscribers.forEach((callback) => callback(id, stream));
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }
}
