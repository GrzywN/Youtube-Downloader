/* eslint-disable no-restricted-syntax */
import QueueRenderer from './Renderer/QueueRenderer.js';
import ErrorHandler from './Utility/ErrorHandler.js';
import DOMElements from './Utility/DOMElements.js';

class QueueList {
  static queueList = {};

  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static init() {
    QueueList.addListeners();
  }

  static addListeners() {
    const clearTheListButton = DOMElements.clearTheList;

    const clearTheListBoundFn = QueueList.clearTheList.bind(this);

    clearTheListButton.addEventListener('click', clearTheListBoundFn);
  }

  static clearTheList() {
    const isEmpty = Object.keys(QueueList.queueList).length === 0;
    if (isEmpty) return;

    for (const resultItem of Object.values(QueueList.queueList)) {
      QueueRenderer.removeItem(resultItem);
    }

    QueueList.queueList = {};
  }

  static addToQueue(resultItem) {
    if (resultItem.id in QueueList.queueList) {
      console.log('Already in queue');
    } else {
      QueueList.queueList[resultItem.id] = resultItem;
      QueueList.renderItem(resultItem);
    }
  }

  static renderItem(resultItem) {
    QueueRenderer.render(resultItem, DOMElements.queue);
  }

  static removeFromQueue(resultItem) {
    QueueRenderer.removeItem(resultItem);
    delete QueueList.queueList[resultItem.id];
  }
}

export default QueueList;
