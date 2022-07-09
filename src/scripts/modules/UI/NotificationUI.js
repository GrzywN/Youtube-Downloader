const SUCCESS = "SUCCESS";
const INFO = "INFO";
const ERROR = "ERROR";

export default class NotificationUI {
  constructor(containerSelector) {
    this.containerElement = document.querySelector(containerSelector);

    this.validateSelectors();

    globalThis.notificationUI = this;
  }

  validateSelectors() {
    if (this.containerElement != null) return;

    const errorString = `${
      this.constructor.name
    }: ${"container element not found"}`;

    throw new Error(errorString);
  }

  createSuccess(message) {
    this.createNotification(message, SUCCESS);
  }

  createInfo(message) {
    this.createNotification(message, INFO);
  }

  createError(message) {
    this.createNotification(message, ERROR);
  }

  createNotification(notification, type) {
    this.notification = notification;
    this.type = type;

    this.#clearLastNotification();
    this.#renderNotification();
  }

  #clearLastNotification(deleteButton) {
    if (deleteButton != null) {
      deleteButton.onclick = null;
    }
    this.containerElement.innerHTML = "";
  }

  #renderNotification() {
    const element = this.#createElement();
    this.#appendElement(element);
  }

  #createElement() {
    const element = document.createElement("div");
    const html = this.#getHTMLfromTemplate();
    element.innerHTML = html;

    const deleteButton = element.querySelector("button.delete");
    deleteButton.onclick = () => this.#clearLastNotification(deleteButton);

    return element;
  }

  #getHTMLfromTemplate() {
    return `
        <div class="notification ${this.#getStyleClass()}">
          <button class="delete"></button>
          ${this.notification}
        </div>
      `;
  }

  #getStyleClass() {
    switch (this.type) {
      case SUCCESS:
        return "is-success";
      case INFO:
        return "is-info";
      case ERROR:
        return "is-danger";
      default:
        return "";
    }
  }

  #appendElement(element) {
    this.containerElement.appendChild(element);
  }
}
