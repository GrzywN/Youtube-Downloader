import ErrorHandler from './modules/Utility/ErrorHandler.mjs';
import TitleBar from './TitleBar.mjs';
import Search from './modules/Search.mjs';
import Downloader from './modules/Downloader.mjs';
import QueueList from './modules/QueueList.mjs';

class App {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static init() {
    const titleBar = TitleBar.init();
    const downloader = Downloader.init();
    const queueList = QueueList.init();
    const search = new Search();
  }
}

App.init();
