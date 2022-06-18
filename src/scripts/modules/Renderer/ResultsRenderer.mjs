import Renderer from './Renderer.mjs';

import DOMElements from '../Utility/DOMElements.mjs';
import Downloader from '../Downloader.mjs';
import ErrorHandler from '../Utility/ErrorHandler.mjs';
import QueueList from '../QueueList.mjs';

class ResultsRenderer extends Renderer {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static getHTMLfromTemplate(resultItem) {
    return `
        <div class="media box has-background-warning-light is-flex is-align-items-center">
            <figure class="media-left image thumbnail">
              <img
                class="is-16by9"
                src="${resultItem.thumbnailURL.url}"
                alt="Thumbnail"
                loading="lazy"
              />
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
                <button ${resultItem.enabled ? '' : 'disabled'} 
                class="button is-small is-outlined is-primary" id="download-${
                  resultItem.id
                }">Download</button>
                <button ${resultItem.enabled ? '' : 'disabled'} 
                class="button is-small is-outlined is-info ml-4" id="add-to-queue-${
                  resultItem.id
                }">Add to queue</button>
              </div>
            </div>
          </div>
    `;
  }

  static addListeners(element, resultItem) {
    const downloadButton = element.querySelector('#download-' + element.dataset.id);
    const addToQueueButton = element.querySelector('#add-to-queue-' + element.dataset.id);

    downloadButton.addEventListener('click', Downloader.download.bind(null, resultItem));
    addToQueueButton.addEventListener('click', QueueList.addToQueue.bind(null, resultItem));
  }

  static removePrevResults() {
    this.removeAllListeners();
    DOMElements.searchResults.innerHTML = '';
  }

  static removeAllListeners() {
    const downloadButtons = DOMElements.searchResults.querySelectorAll('[id^="download-"]');
    const addToQueueButtons = DOMElements.searchResults.querySelectorAll('[id^="add-to-queue-"]');

    downloadButtons.forEach(button => {
      button.removeEventListener('click', Downloader.download.bind(null, resultItem));
    });
    addToQueueButtons.forEach(button => {
      button.removeEventListener('click', QueueList.addToQueue.bind(null, resultItem));
    });
  }
}

export default ResultsRenderer;
