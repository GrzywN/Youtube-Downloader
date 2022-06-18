import Renderer from './Renderer.mjs';

import Downloader from '../Downloader.mjs';
import QueueList from '../QueueList.mjs';
import ErrorHandler from '../Utility/ErrorHandler.mjs';
import DOMElements from '../Utility/DOMElements.mjs';

class QueueRenderer extends Renderer {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static getHTMLfromTemplate(resultItem) {
    return `
      <div class="media box has-background-warning-light is-flex is-align-items-center">
        <figure class="media-left image thumbnail">
          <img class="is-16by9" src="${
            resultItem.thumbnailURL.url
          }" alt="Thumbnail" loading="lazy" />
        </figure>
        <div class="media-content">
          <div class="block">
            <h2 class="title is-size-6">
              <a href="${resultItem.url}" class="has-text-dark" target="_blank">
                ${resultItem.title}
              </a>
            </h2>
            <p class="subtitle is-size-7"><time>${resultItem.duration}</time></p>
          </div>
          <div class="block is-flex is-justify-content-end">
            <button
              class="button is-small is-outlined is-primary"
              id="download-${resultItem.id}"
              ${resultItem.enabled ? '' : 'disabled'}
            >
              Download
            </button>
            <button
              class="button is-small is-outlined is-danger ml-4"
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
    const downloadButton = element.querySelector('#download-' + element.dataset.id);
    const removeFromQueueButton = element.querySelector('#remove-from-queue-' + element.dataset.id);

    downloadButton.addEventListener('click', Downloader.download.bind(null, resultItem));
    removeFromQueueButton.addEventListener(
      'click',
      QueueList.removeFromQueue.bind(null, resultItem)
    );
  }

  // static removePrevResults() {
  // this.removeAllListeners();
  // DOMElements.searchResults.innerHTML = '';
  // }

  static removeItem(resultItem) {
    const element = DOMElements.queue.querySelector(`[data-id="${resultItem.id}"]`);
    element.remove();

    QueueRenderer.removeListenersFromEntry(element, resultItem);
  }

  static removeListenersFromEntry(element, resultItem) {
    const downloadButton = element.querySelector('#download-' + element.dataset.id);
    const removeFromQueueButton = element.querySelector('#remove-from-queue-' + element.dataset.id);

    downloadButton.removeEventListener('click', Downloader.download.bind(null, resultItem));
    removeFromQueueButton.removeEventListener(
      'click',
      QueueList.removeFromQueue.bind(null, resultItem)
    );
  }

  // static removeAllListeners() {
  //   const downloadButtons = DOMElements.searchResults.querySelectorAll('[id^="download-"]');
  //   const removeFromQueueButtons = DOMElements.searchResults.querySelectorAll(
  //     '[id^="remove-from-queue-"]'
  //   );
  //   downloadButtons.forEach(button => {
  //     button.removeEventListener('click', Downloader.download.bind(null, resultItem));
  //   });
  //   removeFromQueueButtons.forEach(button => {
  //     button.removeEventListener('click', QueueList.removeFromQueue.bind(null, resultItem));
  //   });
  // }
}

export default QueueRenderer;