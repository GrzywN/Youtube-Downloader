import DOMElements from './Utility/DOMElements.mjs';
import Results from './Results.mjs';

const ytsr = require('ytsr');

export default class Search {
  constructor() {
    this.init();
    this.results;
  }

  init() {
    this.setListeners();
  }

  setListeners() {
    DOMElements.searchButton.addEventListener('click', this.search.bind(this));
  }

  search() {
    const inputText = DOMElements.searchInput.value;
    if (inputText.length <= 0) return;
    if (this.results != null) {
      this.results.updateResults();
    }
    ytsr(inputText, { pages: 1 }).then(results => this.render(results));
  }

  updateResults() {
    this.results.updateResults(results.items);
  }

  render(results) {
    if (this.results == null) this.results = new Results(results.items);
    else this.results.render(results.items);
  }
}
