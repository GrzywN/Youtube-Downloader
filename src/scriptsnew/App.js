import SearchUI from './modules/SearchUI';
import ListItemFactory from './modules/ListItemFactory';
import ResultsList from './modules/ResultsList';
import ResultsUI from './modules/ResultsUI';
import QueueList from './modules/QueueList';
import QueueUI from './modules/QueueUI';
import Downloader from './modules/Downloader';
import OptionsUI from './modules/OptionsUI';
import QueueLoader from './modules/QueueLoader';

const searchUI = new SearchUI();
const listItemFactory = new ListItemFactory();
const resultsList = new ResultsList();
const resultsUI = new ResultsUI();
const queueList = new QueueList();
const queueUI = new QueueUI();
const downloader = new Downloader();
const optionsUI = new OptionsUI();
const queueLoader = new QueueLoader();

searchUI.subscribe((searchResults) => {
    listItemFactory.overrideItems(searchResults);
    const listOfResults = listItemFactory.getItems();
    resultsList.update(listOfResults);
    resultsUI.render(resultsList);
});

resultsUI.subscribeEvents((event, type) => handleEvents);
queueUI.subscribeEvents((event, type) => handleEvents);

const handleEvents = (event, type) => {
    const item = resultsList.getItemFromEvent(event);

    switch (type) {
        case 'DOWNLOAD': {
            downloader.download(item);
        }
        case 'ADD_TO_QUEUE': {
            queueList.addItem(item);
            queueUI.renderItem(item);
        }
        case 'REMOVE_FROM_QUEUE': {
            queueList.removeItem(item);
            queueUI.removeItem(item);
        }
        case 'DOWNLOAD_ALL': {
            for (const item in queueList) {
                downloader.download(item);
            }
        }
        case 'ADD_RESULTS_TO_QUEUE': {
            for (const item in resultsList) {
                queueList.addItem(item);
                queueUI.renderItem(item);
            }
        }
        case 'CLEAR_THE_QUEUE': {
            for (const item in queueList) {
                queueList.removeItem(item);
                queueUI.removeItem(item);
            }
        }
    }
};

optionsUI.subscribe(({ option, type }) => {
    switch (type) {
        case 'SELECT_CHANGE': {
            downloader.setFormat(option);
        }
        case 'SELECT_PATH': {
            downloader.setPath(option);
        }
        case 'LOAD_QUEUE': {
            queueLoader.load();
        }
        case 'SAVE_QUEUE': {
            queueLoader.save();
        }
    }
});

// TODO: Dodać listenery do całych results i queue
