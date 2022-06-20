import DOMElements from './Utility/DOMElements.js';
import Results from './Results.js';

const ytsr = require('ytsr');
const ytpl = require('ytpl');

export default class Search {
  constructor() {
    this.init();
    // this.results;
  }

  init() {
    this.setListeners();
  }

  setListeners() {
    const searchBoundFn = this.search.bind(this);

    DOMElements.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchBoundFn();
    });
    DOMElements.searchButton.addEventListener('click', searchBoundFn);
  }

  search() {
    const inputText = DOMElements.searchInput.value;
    if (inputText.length <= 0) return;

    const isPlaylist = ytpl.validateID(inputText);

    if (isPlaylist) this.searchPlaylist(inputText);
    else this.searchResults(inputText);
  }

  searchPlaylist(inputText) {
    ytpl(inputText).then((results) => this.render(results));
  }

  searchResults(inputText) {
    if (this.results != null) {
      this.results.updateResults();
    }
    ytsr(inputText, { pages: 1 }).then((results) => this.render(results));
  }

  render(results) {
    if (this.results == null) this.results = new Results(results.items);
    else this.results.render(results.items);
  }
}
