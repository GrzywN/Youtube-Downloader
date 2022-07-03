class smth {
  constructor() {
    this.subscribers = [];
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
