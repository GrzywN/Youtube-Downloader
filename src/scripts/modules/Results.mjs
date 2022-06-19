import QueueList from './QueueList.mjs';
import ResultItem from './ResultItem.mjs';
import ResultsRenderer from './Renderer/ResultsRenderer.mjs';
import DOMElements from './Utility/DOMElements.mjs';

class Results {
  constructor(results) {
    this.resultItemList = [];
    this.addListeners();
    this.render(results);
  }

  addListeners() {
    const addResultsToQueueButton = DOMElements.addResultsToQueue;
    const addResultsToQueueBoundFn = this.addResultsToQueue.bind(this);

    addResultsToQueueButton.addEventListener('click', addResultsToQueueBoundFn);
  }

  addResultsToQueue() {
    for (const resultItem of this.resultItemList) {
      if (resultItem.enabled) QueueList.addToQueue(resultItem);
    }
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
