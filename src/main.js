const { getSheetsData } = require("./sheetsApi");
const { app, BrowserWindow, ipcMain } = require("electron");
const { generateRobotObj, generateRobotTotals } = require("./DataFunctions");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let sheetID = "1CUyWoJxUDowDXjNDxubQgOPFUIKvwOEIgOioDdZG8o0";
let tabName = "Sheet1";
// TODO: Handle error as a message in the page instead of crashing (i.e return null )
//  and check in DataTable, then display that failed
const handleGetSheet = (event) => {
  //TODO make it have params sheetID and tabName
  // i.e unhardcode below

  const data = getSheetsData(sheetID, tabName)
    .then((data) => {
      // handle the fetched data here
      // For future, will be some error handler that can create a toast
      return Object.keys(data)[0] === "error"
        ? [{ ERROR: "An error occured when fetching data." }]
        : data;
    })
    .catch((error) => {
      // handle any errors that may occur
      console.error(error);
    });
  return data;
};

const handleUpdateSheetIdentifiers = (event, newSheetID, newTabName) => {
  sheetID = newSheetID;
  tabName = newTabName;
};

const handleGetSheetIds = (event) => {
  // needed to change names to avoid clashing var names in Settings.js
  return { sheetsID: sheetID, tabID: tabName };
};

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
  ipcMain.handle("get-sheet", handleGetSheet);
  ipcMain.handle("get-sheet-ids", handleGetSheetIds);
  ipcMain.on("update-sheet-identifiers", handleUpdateSheetIdentifiers);
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
