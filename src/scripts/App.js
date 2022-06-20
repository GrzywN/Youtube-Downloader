import ErrorHandler from './modules/Utility/ErrorHandler.js';
import TitleBar from './modules/TitleBar.js';
import Search from './modules/Search.js';
import Downloader from './modules/Downloader.js';
import QueueList from './modules/QueueList.js';

class App {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static init() {
    TitleBar.init();
    Downloader.init();
    QueueList.init();
    const search = new Search();
  }
}

App.init();
