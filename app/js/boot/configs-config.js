(function () {
  'use strict';

  angular
    .module('hackvt.boot')
    .config(assortedConfigs);

    function assortedConfigs($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    }
})();
