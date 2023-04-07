// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("sheetsAPI", {
  getSheet: (sheetID, tabName) =>
    ipcRenderer.invoke("get-sheet", sheetID, tabName),
});
