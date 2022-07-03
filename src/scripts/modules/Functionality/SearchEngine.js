const ytpl = require('ytpl');
const ytsr = require('ytsr');

export default class SearchEngine {
  setValue(value) {
    this.value = value;
  }

  search() {
    if (this.value == null) throw new Error('SearchEngine: value is not set');

    const isPlaylist = ytpl.validateID(this.value);

    if (isPlaylist) {
      return this.searchPlaylist(this.value);
    }
    return this.searchResults(this.value);
  }

  searchPlaylist() {
    return ytpl(this.value);
  }

  searchResults() {
    return ytsr(this.value, { pages: 1 });
  }
}
