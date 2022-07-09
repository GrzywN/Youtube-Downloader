const ytpl = require("ytpl");
const ytsr = require("ytsr");

export default class SearchEngine {
  search(value) {
    this.value = value;
    this.#validateValue();

    const isPlaylist = ytpl.validateID(this.value);

    return isPlaylist
      ? this.#searchPlaylist(value)
      : this.#searchResults(value);
  }

  #validateValue() {
    if (this.value != null) return;

    const errorString = `${
      this.constructor.name
    }: ${"input value is not provided or is empty"}`;

    globalThis.notificationUI.createError(errorString);
    throw new Error(errorString);
  }

  #searchPlaylist() {
    return ytpl(this.value);
  }

  #searchResults() {
    return ytsr(this.value, { pages: 1 });
  }
}
