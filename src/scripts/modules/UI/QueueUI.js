export default class QueueUI {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);

    this.validateSelectors();

    this.subscribers = [];
  }

  validateSelectors() {
    if (this.container != null) return;

    const errorString = `${this.constructor.name}: ${'container element not found'}`;

    globalThis.notificationUI.createError(errorString);
    throw new Error(errorString);
  }

  removeItem(item) {
    const element = this.container.querySelector(`[data-id="${item.id}"]`);
    this.container.removeChild(element);
  }

  renderItem(item) {
    if (!QueueUI.#areArgumentsValid(item)) return;

    const element = QueueUI.#createElement(item);
    this.#addListeners(element);
    this.#appendElement(element);
  }

  static #areArgumentsValid(item) {
    if (
      item.thumbnailURL != null &&
      item.title != null &&
      item.duration != null &&
      item.id != null
    ) {
      return true;
    }
    return false;
  }

  static #createElement(item) {
    const element = document.createElement('div');
    element.dataset.id = item.id;
    element.classList.add('block');
    const html = QueueUI.#getHTMLfromTemplate(item);
    element.innerHTML = html;
    return element;
  }

  static #getHTMLfromTemplate(item) {
    return `
      <div class="media box has-background-grey-darker is-flex is-align-items-center">
        <figure class="media-left image thumbnail">
          <img class="is-16by9" 
          src="${item.thumbnailURL.url}" alt="Thumbnail" loading="lazy" />
        </figure>
        <div class="media-content">
          <div class="block">
            <h2 class="title is-size-6">
              <a href="${item.url}" class="has-text-light" target="_blank">
                ${item.title}
              </a>
            </h2>
            <p class="subtitle is-size-7 has-text-light"><time>${item.duration}</time></p>
          </div>
          <progress data-progress-id="${item.id}"
          class="block progress is-link" value="" max="100"></progress>
          <div class="block is-flex is-justify-content-end">
            <button
              class="button is-rounded is-success has-text-dark"
              id="download-${item.id}"
              ${item.enabled ? '' : 'disabled'}
            >
              Download
            </button>
            <button
              class="button is-rounded is-danger ml-4"
              id="remove-from-queue-${item.id}"
            >
              Remove from queue
            </button>
          </div>
        </div>
        </div>
    `;
  }

  #addListeners(element) {
    const downloadBtn = element.querySelector(`#download-${element.dataset.id}`);
    const removeFromQueueBtn = element.querySelector(`#remove-from-queue-${element.dataset.id}`);

    downloadBtn.onclick = this.#notify.bind(this, element.dataset.id, 'DOWNLOAD');
    removeFromQueueBtn.onclick = this.#notify.bind(this, element.dataset.id, 'REMOVE_FROM_QUEUE');
  }

  #appendElement(element) {
    this.container.appendChild(element);
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
