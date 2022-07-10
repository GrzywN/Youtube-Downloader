export default class SearchUI {
  constructor(inputSelector, buttonSelector) {
    this.input = document.querySelector(inputSelector);
    this.button = document.querySelector(buttonSelector);

    this.validateSelectors();

    this.subscribers = [];
    this.setListeners();
  }

  validateSelectors() {
    const errorArray = [];

    if (this.input == null) {
      errorArray.push("input element not found");
    }

    if (this.button == null) {
      errorArray.push("button element not found");
    }

    if (this.input == null || this.button == null) {
      const errorString = `${this.constructor.name}: ${errorArray.join(", ")}`;

      globalThis.notificationUI.createError(errorString);
      throw new Error(errorString);
    }
  }

  setListeners() {
    this.button.addEventListener("click", this.getInputValue.bind(this));
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.getInputValue();
    });
  }

  getInputValue() {
    const { value } = this.input;
    if (value.length === 0) return;

    this.notify(value);
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }

  notify(value) {
    this.subscribers.forEach((subscriber) => subscriber(value));
  }
}
