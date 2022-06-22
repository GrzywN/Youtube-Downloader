import SearchUI from './modules/SearchUI.js';
import SearchEngine from './modules/SearchEngine.js';
import ListItemFactory from './modules/ListItemFactory.js';
import ResultsList from './modules/ResultsList.js';
import ResultsUI from './modules/ResultsUI.js';
// import QueueList from './modules/QueueList.js';
// import QueueUI from './modules/QueueUI.js';
// import Downloader from './modules/Downloader.js';
// import OptionsUI from './modules/OptionsUI.js';
// import QueueLoader from './modules/QueueLoader.js';

const searchUI = new SearchUI('#search-input', '#search-button');
const searchEngine = new SearchEngine();
const listItemFactory = new ListItemFactory();
const resultsList = new ResultsList();
const resultsUI = new ResultsUI('#search-results');
// const queueList = new QueueList();
// const queueUI = new QueueUI();
// const downloader = new Downloader();
// const optionsUI = new OptionsUI();
// const queueLoader = new QueueLoader();

searchUI.subscribe(async (value) => {
  searchEngine.setValue(value);
  const results = await searchEngine.search();
  listItemFactory.createItems(results);
  const list = listItemFactory.getItems();
  resultsList.update(list);
  const listOfResults = resultsList.getList();
  resultsUI.setResultsList(listOfResults);
  resultsUI.renderResults();
});

resultsUI.subscribe((id, type) => handleResultsEvents(id, type));
// queueUI.subscribeEvents((event, type) => handleEvents);

const handleResultsEvents = (id, type) => {
  //   const item = resultsList.getItemFromID(id);

  console.log(id, type);

  //   switch (type) {
  //     case 'DOWNLOAD': {
  //       downloader.download(item);
  //     }
  //     case 'ADD_TO_QUEUE': {
  //       queueList.addItem(item);
  //       queueUI.renderItem(item);
  //     }
  //     case 'DOWNLOAD_ALL': {
  //       for (const item in queueList) {
  //         downloader.download(item);
  //       }
  //     }
  //     case 'ADD_RESULTS_TO_QUEUE': {
  //       for (const item in resultsList) {
  //         queueList.addItem(item);
  //         queueUI.renderItem(item);
  //       }
  //     }
  //     case 'CLEAR_THE_QUEUE': {
  //       for (const item in queueList) {
  //         queueList.removeItem(item);
  //         queueUI.removeItem(item);
  //       }
  //     }
  //   }
};

// const handleQueueEvents = (id, type) => {
//   const item = queueList.getItemFromID(id);

//   switch (type) {
//     case 'DOWNLOAD': {
//       downloader.download(item);
//     }
//     case 'REMOVE_FROM_QUEUE': {
//       queueList.removeItem(item);
//       queueUI.removeItem(item);
//     }
//     case 'DOWNLOAD_ALL': {
//       for (const item in queueList) {
//         downloader.download(item);
//       }
//     }
//     case 'ADD_RESULTS_TO_QUEUE': {
//       for (const item in resultsList) {
//         queueList.addItem(item);
//         queueUI.renderItem(item);
//       }
//     }
//     case 'CLEAR_THE_QUEUE': {
//       for (const item in queueList) {
//         queueList.removeItem(item);
//         queueUI.removeItem(item);
//       }
//     }
//   }
// };

// optionsUI.subscribe(({ option, type }) => {
//     switch (type) {
//         case 'SELECT_CHANGE': {
//             downloader.setFormat(option);
//         }
//         case 'SELECT_PATH': {
//             downloader.setPath(option);
//         }
//         case 'LOAD_QUEUE': {
//             queueLoader.load();
//         }
//         case 'SAVE_QUEUE': {
//             queueLoader.save();
//         }
//     }
// });

// TODO: Dodać listenery do całych results i queue
