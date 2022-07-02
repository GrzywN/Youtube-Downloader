export default class DownloadingProgress {
  registerProgress(id, stream) {
    const progressBars = document.querySelectorAll(`[data-progress-id="${id}"]`);

    for (const element of progressBars) {
      element.value = '';
      this.setDownloadingStyles(element);
    }

    stream.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      const progressValue = `${(percent * 100).toFixed(2)}`;

      this.updateProgress(progressBars, progressValue);
    });
  }

  setDownloadingStyles(element) {
    element.classList.remove('is-success');
    element.classList.add('is-link');
  }

  setSuccessStyles(element) {
    element.classList.remove('is-link');
    element.classList.add('is-success');
  }

  updateProgress(progressBars, progress) {
    for (const element of progressBars) {
      element.value = progress;
      element.textContent = `${progress}%`;

      if (element.value === 100) this.setSuccessStyles(element);
    }
  }
}
