const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const open = require('open');

const {
  selectPath,
  loadQueue,
  saveQueue,
  getAppPath,
  minimize,
  maximize,
} = require('./ipcHandlers.js');

function handleIPC(window, app) {
  getAppPath(window, app);
  selectPath(window);
  loadQueue(window);
  saveQueue(window);
  minimize(window);
  maximize(window);
}

if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    minWidth: 1366,
    minHeight: 768,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.webContents.on('new-window', function (event, url) {
    event.preventDefault();
    open(url);
  });

  mainWindow.webContents.openDevTools();

  Menu.setApplicationMenu(null);

  handleIPC(mainWindow, app);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
