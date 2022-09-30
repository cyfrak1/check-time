const { contextBridge, ipcRenderer } = require("electron");
const d = require("fetch-installed-software");
const {
  ListenForRunningWindowsApps,
  saveProgramRunningTime,
  showJsonFile,
} = require("./monitoring");
const { ListenForCursorPosition } = require("./cursor");
const { processPythonScript } = require("./processPythonScript");

const API = {
  disActiveWindow: () => ipcRenderer.send("disactive-window"),
  minimalizeWindow: () => ipcRenderer.send("minimalize-window"),
  fullWindow: () => ipcRenderer.send("full-window"),
  getCurrentPrograms: async () => {
    return d.getAllInstalledSoftware();
  },
  saveListOfOfficePrograms: (data) =>
    ipcRenderer.send("save-office-programs", data),
  deleteFromListOfOfficePrograms: (data) =>
    ipcRenderer.send("delete-office-program", data),
  deleteAllDataForTest: () => ipcRenderer.send("delete-all-data-for-test"),
  returnStoredOfficePrograms: (callback) => {
    ipcRenderer.send("return-office-programs");
    ipcRenderer.on("office-programs", (event, args) => {
      callback(args);
    });
  },
  savePassword: (data) => ipcRenderer.send("save-password", data),
  setFirstUse: () => ipcRenderer.send("set-user-first-use"),
  firstUse: (callback) => {
    ipcRenderer.send("set-first-use");
    ipcRenderer.on("first-use", (event, args) => {
      callback(args);
    });
  },
  ListenForRunningWindowsApps: (callback) =>
    ListenForRunningWindowsApps(callback),
  saveProgramRunningTime: () => {
    saveProgramRunningTime();
  },
  showJsonFile: showJsonFile,
  ListenForCursorPosition: (callback) => {
    ListenForCursorPosition(callback);
  },
  processPythonScript: () => {
    processPythonScript();
  },
};
contextBridge.exposeInMainWorld("api", API);
