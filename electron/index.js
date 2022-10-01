const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const {
  storeData,
  returnStoredData,
  deleteItemFromStoredData,
  deleteAllDataForTest,
} = require("./store");

app.allowRendererProcessReuse = false;
app.whenReady().then(checkTimeApplicationInit);
let mainWindow;
let isFirstUse = true;

function checkTimeApplicationInit() {
  // create window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    autoHideMenuBar: true,
    show: false, // window not visible until we change this value this helps to prevent waiting for content
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    title: "Check Time",
    // custom title bar
    titleBarStyle: "hidden",
  });
  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  }); //change value show into true
  mainWindow.webContents.openDevTools();
  mainWindow.on("close-btn", () => {
    mainWindow.close();
  });
}

ipcMain.on("disactive-window", () => {
  mainWindow.close();
});
ipcMain.on("minimalize-window", () => {
  mainWindow.minimize();
});
ipcMain.on("full-window", () => {
  mainWindow.maximize();
});
ipcMain.on("save-office-programs", (event, args) => {
  storeData("office-programms", args);
});
ipcMain.on("delete-office-program", (event, args) => {
  deleteItemFromStoredData("office-programms", args);
});
ipcMain.on("delete-all-data-for-test", () => {
  deleteAllDataForTest();
});
ipcMain.on("return-office-programs", () => {
  const officeProgramms = returnStoredData("office-programms");
  mainWindow.webContents.send("office-programs", officeProgramms);
});
ipcMain.on("save-password", (event, args) => {
  storeData("save-password", args);
});
ipcMain.on("set-user-first-use", () => {
  storeData("set-first-use", false);
});
ipcMain.on("set-first-use", () => {
  const firstUse = returnStoredData("set-first-use");
  if (firstUse == undefined) {
    mainWindow.webContents.send("first-use", true);
  } else {
    mainWindow.webContents.send("first-use", false);
  }
});
