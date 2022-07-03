class smth {
  constructor() {
    this.subscribers = [];
  }
  subscribe(callback) {
    this.subscribers.push(callback);
  }
  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }
  notify(id, type) {
    this.subscribers.forEach((subscriber) => subscriber(id, type));
  }
}
