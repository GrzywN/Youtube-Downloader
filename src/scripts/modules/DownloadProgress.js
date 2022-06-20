import ErrorHandler from './Utility/ErrorHandler.js';

class DownloadProgress {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static registerProgress(queueItem, stream) {
    const id = queueItem.id;
    const progressBars = document.querySelectorAll(`[data-progress-id="${id}"]`);

    for (const element of progressBars) {
      element.value = '';
      DownloadProgress.setDownloadingStyles(element);
    }

    stream.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      const progressValue = `${(percent * 100).toFixed(2)}`;

      DownloadProgress.updateProgress(progressBars, progressValue);
    });
  }

  static updateProgress(progressBars, progress) {
    for (const element of progressBars) {
      element.value = progress;
      element.textContent = `${progress}%`;

      if (element.value === 100) DownloadProgress.setSuccessStyles(element);
    }
  }

  static setDownloadingStyles(element) {
    element.classList.remove('is-success');
    element.classList.add('is-link');
  }

  static setSuccessStyles(element) {
    element.classList.remove('is-link');
    element.classList.add('is-success');
  }
}

export default DownloadProgress;
