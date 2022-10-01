const getIfMouseIsClicked = async () => {
  return new Promise((resolve, reject) => {
    const { exec } = require("child_process");
    const commend = `
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.UserControl]::MouseButtons
    `;
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
const ListenForMouseClick = (callback) => {
  setInterval(async () => {
    const data = await getIfMouseIsClicked();
    if (data[0] == "L") {
      callback(true);
    } else {
      callback(false);
    }
  }, 100);
};
module.exports = {
  ListenForMouseClick: ListenForMouseClick,
};
