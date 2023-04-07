// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("sheetsAPI", {
  getSheet: () => ipcRenderer.invoke("get-sheet"),
  getSheetIdentifiers: () => ipcRenderer.invoke("get-sheet-ids"),
  updateSheetIdentifiers: (newSheetID, newTabName) =>
    ipcRenderer.send("update-sheet-identifiers", newSheetID, newTabName),
});
