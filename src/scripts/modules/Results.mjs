import ResultItem from './ResultItem.mjs';
import ResultsRenderer from './Renderer/ResultsRenderer.mjs';
import DOMElements from './Utility/DOMElements.mjs';

class Results {
  constructor(results) {
    this.resultItemList = [];
    this.render(results);
  }

  render(results) {
    this.resultItemList.length = 0;
    for (const result of results) {
      this.resultItemList.push(new ResultItem(result));
    }
    for (const result of this.resultItemList) {
      ResultsRenderer.render(result, DOMElements.searchResults);
    }
  }

  updateResults() {
    this.resultItemList = [];

    ResultsRenderer.removePrevResults();
  }
}

export default Results;
