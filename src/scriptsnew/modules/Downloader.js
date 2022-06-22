const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

const { ipcRenderer } = require('electron');
const { createWriteStream } = require('fs');

const VIDEO_AUDIO_STR = 'Video & Audio';
const AUDIO_STR = 'Audio only';

export default class Downloader {
  constructor(formatSelectSelector) {
    this.formatSelectElement = document.querySelector(formatSelectSelector);
    this.currentPath = this.getDefaultPath();
    this.subscribers = [];
  }

  getDefaultPath() {
    return `${ipcRenderer.sendSync('getAppPath')}/downloads`;
  }

  download(item) {
    if (this.formatSelectElement.value === VIDEO_AUDIO_STR) {
      this.downloadVideo(item);
    } else if (this.formatSelectElement.value === AUDIO_STR) {
      this.downloadAudio(item);
    }
  }

  downloadVideo(item) {
    const stream = ytdl(item.id, {
      filter: (format) => format.container === 'mp4',
    });

    // There might be bugs in this function with title name edge cases.
    const filename = item.title.replaceAll('\\', '').replaceAll('/', '');
    stream.pipe(createWriteStream(`${this.currentPath}/${filename}.mp4`));

    this.broadcastProgress(item, stream);
  }

  downloadAudio(item) {
    const stream = ytdl(`${item.url}`, {
      quality: 'highestaudio',
    });

    const filename = item.title.replaceAll('\\', '').replaceAll('/', '');
    ffmpeg(stream).audioBitrate(320).save(`${this.currentPath}/${filename}.mp3`);

    this.broadcastProgress(item, stream);
  }

  broadcastProgress(item, stream) {
    this.subscribers.forEach((callback) => {
      callback(item, stream);
    });
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }
}
