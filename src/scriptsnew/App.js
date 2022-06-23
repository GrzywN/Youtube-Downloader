import SearchUI from './modules/SearchUI.js';
import SearchEngine from './modules/SearchEngine.js';
import ListItemFactory from './modules/ListItemFactory.js';
import ResultsList from './modules/ResultsList.js';
import ResultsUI from './modules/ResultsUI.js';
import QueueList from './modules/QueueList.js';
import QueueUI from './modules/QueueUI.js';
import Downloader from './modules/Downloader.js';
import GlobalButtonsUI from './modules/GlobalButtonsUI.js';
import OptionsUI from './modules/OptionsUI.js';
// import QueueLoader from './modules/QueueLoader.js';

const searchUI = new SearchUI('#search-input', '#search-button');
const searchEngine = new SearchEngine();
const listItemFactory = new ListItemFactory();
const resultsList = new ResultsList();
const resultsUI = new ResultsUI('#search-results');
const queueList = new QueueList();
const queueUI = new QueueUI('#queue-list');
const downloader = new Downloader('#format-select');
const globalButtonsUI = new GlobalButtonsUI({
  downloadAll: '#download-all',
  addResultsToQueue: '#add-results-to-queue',
  clearQueue: '#clear-the-list',
});
const optionsUI = new OptionsUI({
  formatSelect: '#format-select',
  selectPath: '#select-path',
  loadQueue: '#load-queue',
  saveQueue: '#save-queue',
});
// const queueLoader = new QueueLoader();

searchUI.subscribe((value) => handleSearchEvents(value));
resultsUI.subscribe((id, type) => handleResultsEvents(id, type));
queueUI.subscribe((id, type) => handleQueueEvents(id, type));
globalButtonsUI.subscribe((type) => handleGlobalButtonsEvents(type));
optionsUI.subscribe((option, type) => handleOptionsEvents(option, type));

const handleSearchEvents = async (value) => {
  searchEngine.setValue(value);
  const results = await searchEngine.search();
  listItemFactory.createItems(results);
  const list = listItemFactory.getItems();
  resultsList.update(list);
  const listOfResults = resultsList.getList();
  resultsUI.setResultsList(listOfResults);
  resultsUI.renderResults();
};

const handleResultsEvents = (id, type) => {
  const item = resultsList.getItemFromID(id);

  switch (type) {
    case 'DOWNLOAD': {
      downloader.download(item);
      break;
    }
    case 'ADD_TO_QUEUE': {
      const isOnQueue = queueList.isOnQueue(item);

      if (isOnQueue) {
        console.log('Already on queue');
      } else {
        queueList.addItem(item);
        queueUI.renderItem(item);
      }

      break;
    }
  }
};

const handleQueueEvents = (id, type) => {
  const item = queueList.getItemFromID(id);
  switch (type) {
    case 'DOWNLOAD': {
      downloader.download(item);
      break;
    }
    case 'REMOVE_FROM_QUEUE': {
      queueUI.removeItem(item);
      queueList.removeItem(item);
      break;
    }
  }
};

const handleGlobalButtonsEvents = (type) => {
  const queue = queueList.getList();
  const results = resultsList.getList();

  switch (type) {
    case 'DOWNLOAD_ALL': {
      for (const item in queue) {
        downloader.download(queue[item]);
      }
      break;
    }
    case 'ADD_RESULTS_TO_QUEUE': {
      for (const item in results) {
        const isOnQueue = queueList.isOnQueue(results[item]);
        if (isOnQueue) {
          console.log('Already on queue');
        } else {
          queueList.addItem(results[item]);
          queueUI.renderItem(results[item]);
        }
      }
      break;
    }
    case 'CLEAR_THE_QUEUE': {
      for (const item in queue) {
        queueUI.removeItem(queue[item]);
        queueList.removeItem(queue[item]);
      }
      break;
    }
  }
};

const handleOptionsEvents = (type) => {
  switch (type) {
    case 'CHANGE_FORMAT': {
      downloader.updateSelectedFormat();
      break;
    }
    case 'SELECT_PATH': {
      downloader.setPath();
      break;
    }
    case 'LOAD_QUEUE': {
      console.log('LOAD_QUEUE');
      // queueLoader.load();
      break;
    }
    case 'SAVE_QUEUE': {
      console.log('SAVE_QUEUE');
      // queueLoader.save();
      break;
    }
  }
};
