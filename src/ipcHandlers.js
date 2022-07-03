/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */

const { dialog, ipcMain } = require('electron');
const { readFileSync, writeFileSync } = require('fs');

function selectPath(mainWindow) {
  ipcMain.on('selectDirectory', async (event) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });
    event.sender.send('pathChange', result.filePaths[0]);
  });
}

function loadQueue(mainWindow) {
  ipcMain.on('loadQueue', async (event) => {
    try {
      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        defaultPath: './queues',
      });
      const fileContents = readFileSync(result.filePaths[0], 'utf-8');
      event.returnValue = JSON.parse(fileContents);
    } catch (err) {
      event.returnValue = new Error(err);
    }
  });
}

function saveQueue(mainWindow) {
  ipcMain.on('saveQueue', async (event, args) => {
    const result = await dialog.showSaveDialog(mainWindow, {
      filters: [{ name: '', extensions: ['json'] }],
      defaultPath: './queues',
    });
    if (result.filePath) {
      const json = JSON.stringify(args);

      if (result.filePath.endsWith('.json')) {
        writeFileSync(result.filePath, json);
      } else {
        writeFileSync(`${result.filePath}.json`, json);
      }
    }
  });
}

function getAppPath(mainWindow, app) {
  ipcMain.on('getAppPath', (event) => {
    event.returnValue = app.getAppPath();
  });
}

function minimize(mainWindow) {
  ipcMain.on('minimize', () => {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    } else {
      mainWindow.minimize();
    }
  });
}

function maximize(mainWindow) {
  ipcMain.on('maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
}

module.exports = {
  getAppPath,
  loadQueue,
  saveQueue,
  selectPath,
  minimize,
  maximize,
};
