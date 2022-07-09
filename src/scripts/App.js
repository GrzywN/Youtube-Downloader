import SearchUI from "./modules/UI/SearchUI.js";
import ResultsUI from "./modules/UI/ResultsUI.js";
import QueueUI from "./modules/UI/QueueUI.js";
import GlobalButtonsUI from "./modules/UI/GlobalButtonsUI.js";
import OptionsUI from "./modules/UI/OptionsUI.js";
import TitleBarUI from "./modules/UI/TitleBarUI.js";
import DownloadProgress from "./modules/UI/DownloadProgress.js";
import NotificationUI from "./modules/UI/NotificationUI.js";

import ListItemFactory from "./modules/Data/ListItemFactory.js";
import ResultsList from "./modules/Data/ResultsList.js";
import QueueList from "./modules/Data/QueueList.js";

import SearchEngine from "./modules/Functionality/SearchEngine.js";
import Downloader from "./modules/Functionality/Downloader.js";
import QueueLoader from "./modules/Functionality/QueueLoader.js";

const { ipcRenderer } = require("electron");

// NotificationUI instance is globally available via globalThis.notificationUI
// and must be initialized first.

const notificationUI = new NotificationUI("#notification-field");

const searchUI = new SearchUI("#search-input", "#search-button");
const searchEngine = new SearchEngine();
const listItemFactory = new ListItemFactory();
const resultsList = new ResultsList();
const resultsUI = new ResultsUI("#search-results");
const queueList = new QueueList();
const queueUI = new QueueUI("#queue-list");
const downloader = new Downloader("#format-select");
const globalButtonsUI = new GlobalButtonsUI({
  downloadAll: "#download-all",
  addResultsToQueue: "#add-results-to-queue",
  clearQueue: "#clear-the-list",
});
const optionsUI = new OptionsUI({
  formatSelect: "#format-select",
  selectPath: "#select-path",
  loadQueue: "#load-queue",
  saveQueue: "#save-queue",
});
const queueLoader = new QueueLoader();
const titleBar = new TitleBarUI({
  minimize: "#minimize-app",
  maximize: "#maximize-app",
  close: "#close-app",
});

async function onSearch(value) {
  const results = await searchEngine.search(value);

  listItemFactory.createItems(results);
  const list = listItemFactory.getItems();

  resultsList.update(list);
  const listOfResults = resultsList.getList();

  resultsUI.setResultsList(listOfResults);
  resultsUI.renderResults();
}

function onResultEvent(id, type) {
  const item = resultsList.getItemFromID(id);
  switch (type) {
    case "DOWNLOAD": {
      downloader.download(item);
      break;
    }

    case "ADD_TO_QUEUE": {
      const isOnQueue = queueList.isOnQueue(item);

      if (!isOnQueue) {
        queueList.addItem(item);
        queueUI.renderItem(item);
      }

      break;
    }

    default: {
      throw new Error(
        `App.js: Default case in onResultEvent (id, type) (${id}, ${type})`
      );
    }
  }
}

function onQueueEvent(id, type) {
  const item = queueList.getItemFromID(id);
  switch (type) {
    case "DOWNLOAD": {
      downloader.download(item);
      break;
    }

    case "REMOVE_FROM_QUEUE": {
      queueUI.removeItem(item);
      queueList.removeItem(item);
      break;
    }

    default: {
      throw new Error(
        `App.js: Default case in onQueueEvent (id, type) (${id}, ${type})`
      );
    }
  }
}

function onGlobalButtonEvent(type) {
  const queueArray = queueList.getValueList();
  const resultsArray = resultsList.getValueList();

  switch (type) {
    case "DOWNLOAD_ALL": {
      queueArray.forEach((item) => downloader.download(item));
      break;
    }

    case "ADD_RESULTS_TO_QUEUE": {
      resultsArray.forEach((item) => {
        const isOnQueue = queueList.isOnQueue(item);
        if (!isOnQueue) {
          queueList.addItem(item);
          queueUI.renderItem(item);
        }
      });
      break;
    }

    case "CLEAR_THE_QUEUE": {
      queueArray.forEach((item) => {
        queueUI.removeItem(item);
        queueList.removeItem(item);
      });
      break;
    }

    default: {
      throw new Error(
        `App.js: Default case in onGlobalButtonEvent (type) (${type})`
      );
    }
  }
}

function onOptionEvent(type) {
  switch (type) {
    case "CHANGE_FORMAT": {
      downloader.updateSelectedFormat();
      break;
    }

    case "SELECT_PATH": {
      Downloader.setPath();
      break;
    }

    case "LOAD_QUEUE": {
      queueLoader.load();
      const loadedQueueArray = queueLoader.getValueList();

      if (loadedQueueArray.length === 0) return;

      const queueArray = queueList.getValueList();

      queueArray.forEach((item) => {
        queueUI.removeItem(item);
        queueList.removeItem(item);
      });

      loadedQueueArray.forEach((item) => {
        queueList.addItem(item);
        queueUI.renderItem(item);
      });

      break;
    }

    case "SAVE_QUEUE": {
      const queue = queueList.getList();
      queueLoader.save(queue);

      break;
    }

    default: {
      throw new Error(`App.js: Default case in onOptionEvent (type) (${type})`);
    }
  }
}

function onTitleBarEvent(type) {
  switch (type) {
    case "CLOSE": {
      window.close();
      break;
    }

    case "MINIMIZE": {
      ipcRenderer.send("minimize");
      break;
    }

    case "MAXIMIZE": {
      ipcRenderer.send("maximize");
      break;
    }

    default: {
      throw new Error(
        `App.js: Default case in onTitleBarEvent (type) (${type})`
      );
    }
  }
}

function onDownload(id, stream) {
  DownloadProgress.registerProgress(id, stream);
  stream.on("end", async () => {
    notificationUI.createNotification("Downloading complete!", "SUCCESS");
  });
}

searchUI.subscribe((value) => onSearch(value));
resultsUI.subscribe((id, type) => onResultEvent(id, type));
queueUI.subscribe((id, type) => onQueueEvent(id, type));
globalButtonsUI.subscribe((type) => onGlobalButtonEvent(type));
optionsUI.subscribe((type) => onOptionEvent(type));
titleBar.subscribe((type) => onTitleBarEvent(type));
downloader.subscribe((id, stream) => onDownload(id, stream));
