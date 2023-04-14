const { getSheetsData } = require("./sheetsApi");
const { app, BrowserWindow, ipcMain } = require("electron");
const {
  generateRobotObj,
  generateRobotTotals,
  generateRobotAverages,
} = require("./DataFunctions");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

// globals and stuff will be moved to a better place later
let pitScoutSheetID = "1CUyWoJxUDowDXjNDxubQgOPFUIKvwOEIgOioDdZG8o0";
let pitScoutTabName = "Sheet4";
let matchSheetID = "1CUyWoJxUDowDXjNDxubQgOPFUIKvwOEIgOioDdZG8o0";
let matchTabName = "Sheet1";
// TODO: Handle error as a message in the page instead of crashing (i.e return null )
//  and check in DataTable, then display that failed
const handleGetSheet = (event, type) => {
  // returns the data depending on the type of sheet requested, either match data or pit scouting data
  let sheetID;
  let tabName;
  if (type === "pitScout") {
    sheetID = pitScoutSheetID;
    tabName = pitScoutTabName;
  } else if (type === "match") {
    sheetID = matchSheetID;
    tabName = matchTabName;
  } else {
    console.error(
      `ERROR: Invalid type of form '${type}', valid form types: 'pitScout', 'match'`
    );
  }

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

// TODO: cache a lot of these values and then bind it to a signle reload event (then reload button would call event)
const handleUpdateSheetIds = (event, newSheetID, newTabName, type) => {
  // based on whether you are setting the pit scouting google sheet IDs or the match data
  if (type === "pitScout") {
    pitScoutSheetID = newSheetID;
    pitScoutTabName = newTabName;
  } else if (type === "match") {
    matchSheetID = newSheetID;
    matchTabName = newTabName;
  } else {
    console.error(
      `ERROR: Invalid type of form '${type}', valid form types: 'pitScout', 'match'`
    );
  }
};

const handleGetSheetIds = (event, type) => {
  console.log("handling sheet ids");
  let sheetsID;
  let tabID;
  if (type === "pitScout") {
    console.log("pitscout");
    sheetsID = pitScoutSheetID;
    tabID = pitScoutTabName;
  } else if (type === "match") {
    console.log("match");
    sheetsID = matchSheetID;
    console.log(`ID: ${sheetsID} `);
    tabID = matchTabName;
  } else {
    console.error(
      `ERROR: Invalid type of form '${type}', valid form types: 'pitScout', 'match'`
    );
  }
  // needed to change names to avoid clashing var names in Settings.js
  return { sheetsID: sheetID, tabID: tabName };
};

const doGenerateRobotTotals = () => {
  // helper function so I don't have to do this every time
  // const sheetsData = getSheetsData(sheetID, tabName);
  // console.log(sheetsData);
  // const robotObj = generateRobotObj(sheetsData);
  // console.log(robotObj);
  const sheetID = matchSheetID;
  const tabName = matchTabName;
  const robotTotals = getSheetsData(sheetID, tabName)
    .then((sheetsData) => {
      return generateRobotTotals(generateRobotObj(sheetsData));
    })
    .catch((error) => console.error(error));
  return robotTotals;
};

const doGenerateRobotObj = () => {
  const sheetID = matchSheetID;
  const tabName = matchTabName;
  const robotObj = getSheetsData(sheetID, tabName)
    .then((sheetsData) => {
      return generateRobotObj(sheetsData);
    })
    .catch((error) => console.error(error));
  console.log(`robot obj ${robotObj}`);
  return robotObj;
};

const handleGetRobotTotals = async (event, teamNum) => {
  // Handles the event. Only returns a single robot's totals. If we need all of them, the function
  // `doGenerateRobotTotals` can be used, although at that point, it should probably be renamed

  const robotTotals = await doGenerateRobotTotals();
  return robotTotals[teamNum];
};

const handleGetRobotAverages = async (event, teamNum) => {
  console.log("getting robot avgs");
  const robotAverages = generateRobotAverages(
    await doGenerateRobotObj(),
    teamNum
  );
  return robotAverages;
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
  ipcMain.handle("get-robot-totals", handleGetRobotTotals);
  ipcMain.handle("get-robot-averages", handleGetRobotAverages);
  ipcMain.on("update-sheet-ids", handleUpdateSheetIds);
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
