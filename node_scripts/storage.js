//Courtesy: https://medium.com/@ccnokes/how-to-store-user-data-in-electron-3ba6bf66bc1e#.ylr30b8t8

const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getAppPath();
    this.path = path.join(userDataPath + '/app/data', opts.fileName + '.json');
    this.data = parseDataFile(this.path, opts.defaults);
  }
  getFile() {
    return this.data;
  }
  getFileProp(key) {
    return this.data[key];
  }
  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
  arrayUnshift(val) {
    this.data = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    return defaults;
  }
}
module.exports = Store;
