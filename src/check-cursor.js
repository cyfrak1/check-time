export const checkCursor = async (callback) => {
  let isMouseClick = false,
    isCursorInDiffrentPosition = false;
  window.api.ListenForMouseClick((data) => {
    if (data == true) {
      isMouseClick = true;
    }
  });
  window.api.ListenForCursorPosition((data) => {
    const differnceInPositionX = Math.abs(
      data[data.length - 1].cursorX - data[0].cursorX
    );
    const differnceInPositionY = Math.abs(
      data[data.length - 1].cursorY - data[0].cursorY
    );
    if (differnceInPositionX >= 50 && differnceInPositionY >= 50) {
      isCursorInDiffrentPosition = true;
    }
  });
  setInterval(() => {
    if (isMouseClick && isCursorInDiffrentPosition) {
      callback(true);
    } else {
      callback(false);
    }
    isMouseClick = false;
    isCursorInDiffrentPosition = false;
  }, 10000);
};
