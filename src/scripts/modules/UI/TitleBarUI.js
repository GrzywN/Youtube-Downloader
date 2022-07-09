const CLOSE = "CLOSE";
const MINIMIZE = "MINIMIZE";
const MAXIMIZE = "MAXIMIZE";

export default class TitleBarUI {
  constructor({ minimize, maximize, close }) {
    this.minimize = document.querySelector(minimize);
    this.maximize = document.querySelector(maximize);
    this.close = document.querySelector(close);

    this.validateSelectors();

    this.subscribers = [];
    this.setListeners();
  }

  validateSelectors() {
    const errorArray = [];

    if (this.minimize == null) {
      errorArray.push("minimize element not found");
    }

    if (this.maximize == null) {
      errorArray.push("maximize element not found");
    }

    if (this.close == null) {
      errorArray.push("close element not found");
    }

    if (this.minimize == null || this.maximize == null || this.close == null) {
      const errorString = `${this.constructor.name}: ${errorArray.join(", ")}`;

      globalThis.notificationUI.createError(errorString);
      throw new Error(errorString);
    }
  }

  setListeners() {
    this.minimize.addEventListener("click", this.#notify.bind(this, MINIMIZE));
    this.maximize.addEventListener("click", this.#notify.bind(this, MAXIMIZE));
    this.close.addEventListener("click", this.#notify.bind(this, CLOSE));
  }

  #notify(type) {
    this.subscribers.forEach((subscriber) => subscriber(type));
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }
}
