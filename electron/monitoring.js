const getRunningWindowsApps = async (callback) => {
  const { exec } = require("child_process");
  exec(
    "gps | where {$_.MainWindowTitle } | select Description",
    { shell: "powershell.exe" },
    (error, stdout, stderr) => {
      const aplicationsList = stdout.slice(40).split("  ");
      let aplicationsString = "";
      aplicationsList.forEach((element) => (aplicationsString += element));
      let aplicationsArray = aplicationsString
        .split("\r\n")
        .filter((value, index, arr) => {
          return (
            value != "" &&
            value != "Application Frame Host" &&
            value != "Electron" &&
            value != "Settings" &&
            value != "Setup/Uninstall" &&
            value != "Windows Explorer"
          );
        });
      let finalArrayOfAplications = [];
      aplicationsArray.forEach((element) => {
        if (element[element.length - 1] === " ") {
          element = element.slice(0, element.length - 1);
        }
        finalArrayOfAplications = [...finalArrayOfAplications, element];
      });
      callback(finalArrayOfAplications);
    }
  );
};
const ListenForRunningWindowsApps = async (callback) => {
  let currentPrograms = null;
  setInterval(() => {
    getRunningWindowsApps((data) => {
      if (currentPrograms == null) {
        currentPrograms = data;
        callback(data);
      } else {
        if (data.length != currentPrograms.length) {
          currentPrograms = data;
          callback(data);
        } else {
          let isDataTheSame = true;
          data.forEach((index) => {
            if (data[index] != currentPrograms[index]) {
              isDataTheSame = false;
            }
          });
          currentPrograms = data;
          callback(data);
        }
      }
    });
  }, 60000);
};
const showJsonFile = () => {
  return new Promise((resolve, reject) => {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(__dirname, "../public/assets/data.json");
    let json;
    fs.readFile(filePath, "utf-8", (err, jsonString) => {
      if (err) {
        reject(err);
      } else {
        json = JSON.parse(jsonString);
        json = json.programsArray;
        resolve(json);
      }
    });
  });
};
const saveProgramRunningTime = () => {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(__dirname, "../public/assets/data.json");
  let array, jsonData;
  ListenForRunningWindowsApps((data) => {
    fs.readFile(filePath, "utf-8", (err, jsonString) => {
      if (err) {
        console.error(err);
      } else {
        jsonData = JSON.parse(jsonString);
        array = jsonData.programsArray;
        saveInJson(data);
      }
    });
  });
  const saveInJson = (data) => {
    if (array.length == 0) {
      data.forEach((element, index) => {
        array[index] = {
          programName: element,
          runningTime: 1, // minute
        };
      });
    } else {
      data.forEach((element) => {
        const findInArray = array.findIndex((el) => el.programName == element);
        if (findInArray == -1) {
          array[array.length] = {
            programName: element,
            runningTime: 1, // minute
          };
        } else {
          array[findInArray].runningTime += 1; // minute
        }
      });
    }
    fs.writeFile(
      filePath,
      JSON.stringify({ programsArray: array }, null, "\t"),
      (err) => {
        if (err) {
          console.error("Data regitser failed in monitioring.js");
        }
      }
    );
  };
};

module.exports = {
  getRunningWindowsApps: getRunningWindowsApps,
  ListenForRunningWindowsApps: ListenForRunningWindowsApps,
  saveProgramRunningTime: saveProgramRunningTime,
  showJsonFile: showJsonFile,
};
