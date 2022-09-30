export const checkCursor = async () => {
  window.api.ListenForCursorPosition((data) => {
    console.log(data);
  });
};

// TODO:get click info from cmd
