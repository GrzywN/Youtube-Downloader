/* eslint-disable no-param-reassign */
export default class DownloadProgress {
  static registerProgress(id, stream) {
    const progressBars = document.querySelectorAll(`[data-progress-id="${id}"]`);

    progressBars.forEach((element) => {
      element.value = '';
      DownloadProgress.#setDownloadingStyles(element);
    });

    stream.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      const progressValue = `${(percent * 100).toFixed(2)}`;

      DownloadProgress.#updateProgress(progressBars, progressValue);
    });
  }

  static #setDownloadingStyles(element) {
    element.classList.remove('is-success');
    element.classList.add('is-link');
  }

  static #setSuccessStyles(element) {
    element.classList.remove('is-link');
    element.classList.add('is-success');
  }

  static #updateProgress(progressBars, progress) {
    progressBars.forEach((element) => {
      element.value = progress;
      element.textContent = `${progress}%`;

      if (element.value === 100) {
        DownloadProgress.#setSuccessStyles(element);
      }
    });
  }

  static getCurrentProgress(id) {
    const progressBar = document.querySelector(`[data-progress-id="${id}"]`);
    return progressBar.value;
  }
}
