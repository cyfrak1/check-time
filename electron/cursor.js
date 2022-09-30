const { storeData, returnStoredData, storeCursor } = require("./store");
const Store = require("electron-store");
const findit = require("findit");
const getCursorCurrentPosition = async () => {
  return new Promise((resolve, reject) => {
    const { exec } = require("child_process");
    const commend = `
    Add-Type -AssemblyName System.Windows.Forms
    $X = [System.Windows.Forms.Cursor]::Position.X
    $Y = [System.Windows.Forms.Cursor]::Position.Y
    Write-Output "X: $X | Y: $Y"`;
    exec(commend, { shell: "powershell.exe" }, (error, stdout, stderr) => {
      if (stdout) {
        resolve(stdout);
      } else if (stderr) {
        reject(stderr);
      } else {
        reject(error);
      }
    });
  });
};
const saveCursorPositionInStorage = async () => {
  const currentCursorPosition = await getCursorCurrentPosition();
  storeData("cursor-position", currentCursorPosition);
  const cursorPositionArray = returnStoredData("cursor-position");
  let newStore = [];
  if (cursorPositionArray.length >= 15) {
    storeCursor();
  }
};
// axis equals cursorPosition X or Y
const sliceUntilNAN = (element, axis) => {
  const findStartOfNumber = element.indexOf(axis) + 3;
  const textArray = element.split("");
  let indxOfNumberBegginingAndEnding = [findStartOfNumber, 0];
  textArray.every((element, index) => {
    if (findStartOfNumber < index) {
      if (isNaN(parseInt(element))) {
        indxOfNumberBegginingAndEnding[1] = index;
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  });
  return indxOfNumberBegginingAndEnding;
};
const returnFormatedData = (data) => {
  let transformdData = [];
  data.forEach((element, index) => {
    const sliceNumbersX = sliceUntilNAN(element, "X");
    const sliceNumbersY = sliceUntilNAN(element, "Y");
    transformdData[index] = {
      cursorX: parseInt(element.slice(sliceNumbersX[0], sliceNumbersX[1])),
      cursorY: parseInt(element.slice(sliceNumbersY[0], sliceNumbersY[1])),
    };
  });
  return transformdData;
};
const ListenForCursorPosition = async (callback) => {
  setInterval(async () => {
    await saveCursorPositionInStorage();
    callback(returnFormatedData(returnStoredData("cursor-position")));
  }, 1000);
};
module.exports = {
  ListenForCursorPosition: ListenForCursorPosition,
};
