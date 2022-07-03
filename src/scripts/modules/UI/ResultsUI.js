/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

export default class ResultsUI {
  constructor(containerSelector) {
    this.containerElement = document.querySelector(containerSelector);
    this.subscribers = [];
  }

  setResultsList(resultsList) {
    this.resultsList = resultsList;
  }

  renderResults() {
    if (this.containerElement == null) throw new Error('ResultsUI: Container element not found');
    if (this.resultsList == null) throw new Error('ResultsUI: Results list not set');

    this.#removePrevResults();

    const resultsArray = Object.values(this.resultsList);

    resultsArray.forEach((result) => {
      this.#renderResult(result);
    });
  }

  #renderResult(result) {
    if (!ResultsUI.#areArgumentsValid(result)) return;
    const element = ResultsUI.#createElement(result);

    this.#addListeners(element);
    this.#appendElement(element);
  }

  static #areArgumentsValid(result) {
    if (
      result.thumbnailURL != null &&
      result.title != null &&
      result.duration != null &&
      result.id != null
    ) {
      return true;
    }
    return false;
  }

  static #createElement(result) {
    const element = document.createElement('div');
    element.dataset.id = result.id;
    element.classList.add('block');

    const html = ResultsUI.#getHTMLfromTemplate(result);
    element.innerHTML = html;
    return element;
  }

  static #getHTMLfromTemplate(result) {
    return `
        <div class="media box has-background-grey-dark is-flex is-align-items-center">
            <figure class="media-left image thumbnail">
              <img
                class="is-16by9"
                src="${result.thumbnailURL.url}"
                alt="Thumbnail"
                loading="lazy"
              />
            </figure>
            <div class="media-content">
              <div class="block">
                <h2 class="title is-size-6">
                  <a href="${result.url}" class="has-text-light" target="_blank">
                    ${result.title}
                  </a>
                </h2>
                <p class="subtitle is-size-7 has-text-light"><time>${result.duration}</time></p>
              </div>
              <progress data-progress-id="${result.id}"
              class="block progress is-link" value="" max="100"></progress>
              <div class="block is-flex is-justify-content-end">
                <button ${result.enabled ? '' : 'disabled'} 
                class="button is-rounded is-success has-text-dark" id="download-${result.id}">
                  Download
                </button>
                <button ${result.enabled ? '' : 'disabled'} 
                class="button is-rounded is-info ml-4" id="add-to-queue-${result.id}">
                  Add to queue
                </button>
              </div>
            </div>
          </div>
    `;
  }

  #addListeners(element) {
    const downloadButton = element.querySelector(`#download-${element.dataset.id}`);
    const addToQueueButton = element.querySelector(`#add-to-queue-${element.dataset.id}`);

    downloadButton.onclick = this.#notify.bind(this, element.dataset.id, 'DOWNLOAD');
    addToQueueButton.onclick = this.#notify.bind(this, element.dataset.id, 'ADD_TO_QUEUE');
  }

  #appendElement(element) {
    this.containerElement.appendChild(element);
  }

  #removePrevResults() {
    this.#removeAllListeners();
    this.containerElement.innerHTML = '';
  }

  #removeAllListeners() {
    const buttons = this.containerElement.querySelectorAll(
      '[id^="download-"], [id^="add-to-queue-"]'
    );

    buttons.forEach((button) => (button.onclick = null));
  }

  #notify(id, type) {
    this.subscribers.forEach((subscriber) => subscriber(id, type));
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }
}
