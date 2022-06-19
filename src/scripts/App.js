import ErrorHandler from './modules/Utility/ErrorHandler.mjs';
import Search from './modules/Search.mjs';
import Downloader from './modules/Downloader.mjs';

class App {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static init() {
    const search = new Search();
    const downloader = Downloader.init();
  }
}

App.init();
