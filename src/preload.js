// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("sheetsAPI", {
  getSheet: (type) => ipcRenderer.invoke("get-sheet", type),
  getSheetIds: (type) => ipcRenderer.invoke("get-sheet-ids", type),
  updateSheetIds: (newSheetID, newTabName, type) =>
    ipcRenderer.send("update-sheet-ids", newSheetID, newTabName, type),
});

contextBridge.exposeInMainWorld("dataFunctions", {
  getRobotTotals: (teamNum) => ipcRenderer.invoke("get-robot-totals", teamNum),
  getRobotAverages: (teamNum) =>
    ipcRenderer.invoke("get-robot-averages", teamNum),
});
