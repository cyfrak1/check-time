const Store = require("electron-store");

const storeData = (storeName, data) => {
  const store = new Store();
  const storeNAME = store.get(storeName);
  if (storeNAME) {
    store.set(storeName, [...storeNAME, data]);
  } else {
    store.set(storeName, [data]);
  }
};
const returnStoredData = (storeName) => {
  const store = new Store();
  if (store.get(storeName) == undefined) {
    return [];
  } else {
    return store.get(storeName);
  }
};
const deleteItemFromStoredData = (storeName, data) => {
  const store = new Store();
  const currentStore = store.get(storeName);
  currentStore.forEach((element, index) => {
    if (element.name == data) {
      currentStore.splice(index, 1);
    }
  });
  store.set(storeName, currentStore);
};
const storeCursor = () => {
  const store = new Store();
  let newStore = [];
  store.get("cursor-position").forEach((element, index) => {
    if (index > 7) {
      newStore[newStore.length] = element;
    }
  });
  store.delete("cursor-position");
  store.set("cursor-position", newStore);
};
const deleteAllDataForTest = () => {
  const storeNames = [
    "office-programms",
    "save-password",
    "set-first-use",
    "cursor-position",
  ];

  storeNames.forEach((element) => {
    const store = new Store();
    store.delete(element);
  });
};
module.exports = {
  storeData: storeData,
  returnStoredData: returnStoredData,
  deleteItemFromStoredData: deleteItemFromStoredData,
  storeCursor: storeCursor,
  deleteAllDataForTest: deleteAllDataForTest,
};
