import ErrorHandler from './ErrorHandler.mjs';

class DOMElements {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static searchInput = document.getElementById('search-input');
  static searchButton = document.getElementById('search-button');
  static searchResults = document.getElementById('search-results');

  static formatSelect = document.getElementById('format-select');
  static selectPath = document.getElementById('select-path');
  static loadQueue = document.getElementById('load-queue');
  static saveQueue = document.getElementById('save-queue');
  static queue = document.getElementById('queue');

  static downloadAll = document.getElementById('download-all');
  static clearTheList = document.getElementById('clear-the-list');
}

export default DOMElements;
