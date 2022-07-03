export default class SearchUI {
  constructor(inputSelector, buttonSelector) {
    this.inputElement = document.querySelector(inputSelector);
    this.buttonElement = document.querySelector(buttonSelector);
    this.subscribers = [];
    this.setListeners();
  }

  setListeners() {
    this.buttonElement.addEventListener('click', this.getInputValue.bind(this));
    this.inputElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.getInputValue();
    });
  }

  getInputValue() {
    const value = this.inputElement.value;
    if (value <= 0) return;

    this.#notify(value);
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }

  #notify(value) {
    this.subscribers.forEach((subscriber) => subscriber(value));
  }
}
