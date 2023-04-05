const { getSheetsData } = require("./sheetsApi");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

function handleGetSheet(event) {
    //TODO make it have params sheetID and tabName
    // i.e unhardcode below
  const SHEET_ID = "1CUyWoJxUDowDXjNDxubQgOPFUIKvwOEIgOioDdZG8o0";
  const TAB_NAME = "Sheet1";

  const data = getSheetsData(SHEET_ID, TAB_NAME)
    .then((data) => {
      // handle the fetched data here
      console.log("Data fetch succesful");
      return data;
      // return "definitely data!!";
    })
    .catch((error) => {
      // handle any errors that may occur
      console.error(error);
    });
  return data;
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      enableRemoteModule: true,
      // contextIsolation: false,
    },
  });

  ipcMain.handle('ping', () => 'pong');

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  ipcMain.on('set-title', handleSetTitle);
  ipcMain.handle('get-sheet', handleGetSheet);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

