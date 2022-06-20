/* eslint-disable lines-between-class-members */
import ErrorHandler from './ErrorHandler.js';

class DOMElements {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static closeApp = document.getElementById('close-app');

  static searchInput = document.getElementById('search-input');
  static searchButton = document.getElementById('search-button');
  static searchResults = document.getElementById('search-results');

  static formatSelect = document.getElementById('format-select');
  static selectPath = document.getElementById('select-path');
  static loadQueue = document.getElementById('load-queue');
  static saveQueue = document.getElementById('save-queue');
  static queue = document.getElementById('queue');

  static downloadAll = document.getElementById('download-all');
  static addResultsToQueue = document.getElementById('add-results-to-queue');
  static clearTheList = document.getElementById('clear-the-list');
}

export default DOMElements;
