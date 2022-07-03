import SearchUI from './modules/UI/SearchUI.js';
import ResultsUI from './modules/UI/ResultsUI.js';
import QueueUI from './modules/UI/QueueUI.js';
import GlobalButtonsUI from './modules/UI/GlobalButtonsUI.js';
import OptionsUI from './modules/UI/OptionsUI.js';
import DownloadProgress from './modules/UI/DownloadProgress.js';

import ListItemFactory from './modules/Data/ListItemFactory.js';
import ResultsList from './modules/Data/ResultsList.js';
import QueueList from './modules/Data/QueueList.js';

import SearchEngine from './modules/Functionality/SearchEngine.js';
import Downloader from './modules/Functionality/Downloader.js';
import QueueLoader from './modules/Functionality/QueueLoader.js';

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
const progress = new DownloadProgress();
const queueLoader = new QueueLoader();

searchUI.subscribe((value) => handleSearchEvents(value));
resultsUI.subscribe((id, type) => handleResultsEvents(id, type));
queueUI.subscribe((id, type) => handleQueueEvents(id, type));
globalButtonsUI.subscribe((type) => handleGlobalButtonsEvents(type));
optionsUI.subscribe((type) => handleOptionsEvents(type));
downloader.subscribe((id, stream) => handleDownloadEvents(id, stream));

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
      queueLoader.load();
      const loadedQueue = queueLoader.get();

      if (Object.keys(loadedQueue).length === 0) return;

      const queue = queueList.getList();

      for (const item in queue) {
        queueUI.removeItem(queue[item]);
        queueList.removeItem(queue[item]);
      }

      for (const item in loadedQueue) {
        queueList.addItem(loadedQueue[item]);
        queueUI.renderItem(loadedQueue[item]);
      }

      break;
    }
    case 'SAVE_QUEUE': {
      const queue = queueList.getList();
      queueLoader.save(queue);

      break;
    }
  }
};

const handleDownloadEvents = (id, stream) => {
  progress.registerProgress(id, stream);
};
