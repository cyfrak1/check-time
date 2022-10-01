export const checkCursor = async () => {
  window.api.ListenForMouseClick((data) => {
    // console.log(data);
  });
  window.api.ListenForCursorPosition((data) => {
    // console.log(data);
  });
};
