(function () {
  'use strict';

  angular
    .module('hackvt.utils')
    .factory('diskStorage', diskStorage);

  function diskStorage(slugify) {

    const Store = require('../node_scripts/storage.js');

    var factoryAPI = {
      saveSearch: saveSearch,
      saveStudent: saveStudent,
      fetchDataFile: fetchDataFile
    };
    return factoryAPI;

    ////////////////////////

    function fetchDataFile(fileNameKeyWord) {
      const fetch = new Store({
        fileName: fileNameKeyWord
      });
      var fileContents = fetch.getFile(fileNameKeyWord);
      return fileContents;
    }

    function saveStudent(masterKeyWord, incomingData) {
      const store = new Store({
        fileName: masterKeyWord
      });

      var existingData = store.getFile();

      existingData.unshift(incomingData);

      store.arrayUnshift(existingData);

    }
    function saveSearch(masterKeyWord, incomingData) {
      const store = new Store({
        fileName: masterKeyWord
      });
      var existingData = store.getFile();

      existingData.unshift(incomingData);

      store.arrayUnshift(existingData);

    }

  }
})();
