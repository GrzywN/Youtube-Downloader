import Renderer from './Renderer.js';

import DOMElements from '../Utility/DOMElements.js';
import Downloader from '../Downloader.js';
import QueueList from '../QueueList.js';

class ResultsRenderer extends Renderer {
  static getHTMLfromTemplate(resultItem) {
    return `
        <div class="media box has-background-grey-dark is-flex is-align-items-center">
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
                  <a href="${resultItem.url}" class="has-text-light" target="_blank">
                    ${resultItem.title}
                  </a>
                </h2>
                <p class="subtitle is-size-7 has-text-light"><time>${resultItem.duration}</time></p>
              </div>
              <progress data-progress-id="${resultItem.id}"
              class="block progress is-link" value="" max="100"></progress>
              <div class="block is-flex is-justify-content-end">
                <button ${resultItem.enabled ? '' : 'disabled'} 
                class="button is-rounded is-success has-text-dark" id="download-${resultItem.id}">
                  Download
                </button>
                <button ${resultItem.enabled ? '' : 'disabled'} 
                class="button is-rounded is-info ml-4" id="add-to-queue-${resultItem.id}">
                  Add to queue
                </button>
              </div>
            </div>
          </div>
    `;
  }

  static addListeners(element, resultItem) {
    const downloadButton = element.querySelector(`#download-${element.dataset.id}`);
    const addToQueueButton = element.querySelector(`#add-to-queue-${element.dataset.id}`);

    const downloadBoundFn = Downloader.download.bind(null, resultItem);
    const addToQueueBoundFn = QueueList.addToQueue.bind(null, resultItem);

    downloadButton.onclick = downloadBoundFn;
    addToQueueButton.onclick = addToQueueBoundFn;
  }

  static removePrevResults() {
    this.removeAllListeners();
    DOMElements.searchResults.innerHTML = '';
  }

  static removeAllListeners() {
    const buttons = DOMElements.searchResults.querySelectorAll(
      '[id^="download-"], [id^="add-to-queue-"]'
    );

    buttons.forEach((button) => {
      button.onclick = null;
    });
  }
}

export default ResultsRenderer;
