import Renderer from './Renderer.js';

import Downloader from '../Downloader.js';
import QueueList from '../QueueList.js';
import DOMElements from '../Utility/DOMElements.js';

class QueueRenderer extends Renderer {
  static getHTMLfromTemplate(resultItem) {
    return `
      <div class="media box has-background-grey-darker is-flex is-align-items-center">
        <figure class="media-left image thumbnail">
          <img class="is-16by9" 
          src="${resultItem.thumbnailURL.url}" alt="Thumbnail" loading="lazy" />
        </figure>
        <div class="media-content">
          <div class="block">
            <h2 class="title is-size-6">
              <a href="${resultItem.url}" class="has-text-light" target="_blank">
                ${resultItem.title}
              </a>
            </h2>
            <p class="subtitle is-size-7 has-text-light"><time>${resultItem.duration}</time></p>
          </div>
          <progress data-progress-id="${resultItem.id}"
          class="block progress is-link" value="" max="100"></progress>
          <div class="block is-flex is-justify-content-end">
            <button
              class="button is-rounded is-success has-text-dark"
              id="download-${resultItem.id}"
              ${resultItem.enabled ? '' : 'disabled'}
            >
              Download
            </button>
            <button
              class="button is-rounded is-danger ml-4"
              id="remove-from-queue-${resultItem.id}"
            >
              Remove from queue
            </button>
          </div>
        </div>
        </div>
    `;
  }

  static addListeners(element, resultItem) {
    const downloadButton = element.querySelector(`#download-${element.dataset.id}`);
    const removeFromQueueButton = element.querySelector(`#remove-from-queue-${element.dataset.id}`);

    const downloadBoundFn = Downloader.download.bind(null, resultItem);
    const removeFromQueueBoundFn = QueueList.removeFromQueue.bind(null, resultItem);

    downloadButton.onclick = downloadBoundFn;
    removeFromQueueButton.onclick = removeFromQueueBoundFn;
  }

  static removeItem(resultItem) {
    const element = DOMElements.queue.querySelector(`[data-id="${resultItem.id}"]`);
    console.log(resultItem);
    element.remove();

    QueueRenderer.removeListenersFromEntry(element);
  }

  static removeListenersFromEntry(element) {
    const downloadButton = element.querySelector(`#download-${element.dataset.id}`);
    const removeFromQueueButton = element.querySelector(`#remove-from-queue-${element.dataset.id}`);

    downloadButton.onclick = null;
    removeFromQueueButton.onclick = null;
  }
}

export default QueueRenderer;