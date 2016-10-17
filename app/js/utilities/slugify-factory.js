(function () {
  'use strict';

  angular
    .module('hackvt.utils')
    .factory('slugify', slugify);

  function slugify() {

    var factoryAPI = {
      makeSlug: makeSlug
    };
    return factoryAPI;

    ////////////////////////

    function makeSlug(incomingString) {
      //Courtesy:
      // http://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript
      //to remove white space first, then special characters N.B. also removes numbers
      var text = incomingString.replace(/\s+/g, '');

      function removeSpecials(text) {
        var lower = text.toLowerCase();
        var upper = text.toUpperCase();

        var res = "";
        for(var i=0; i<lower.length; ++i) {
          if(lower[i] != upper[i] || lower[i].trim() === '')
            res += lower[i];
        }
        return res;
      };
      return removeSpecials(text);
    }
  }
})();
