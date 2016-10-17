(function () {
  'use strict';

  angular
    .module('hackvt.utils')
    .factory('scoreCardFetch', scoreCardFetch);

  function scoreCardFetch($http, scorecardKey, scorecardURL) {

    var factoryAPI = {
      fetchData: fetchData
    };
    return factoryAPI;

    ////////////////////////

    function fetchData(incomingData) {
      var lowRate = incomingData.lowRate/100;
      var highPrice = incomingData.highPrice;
      var degree = incomingData.degree.abbr;

      return $http.get(scorecardURL.url + 'per_page=100&' + 'school.state=' + incomingData.state.abbr + '&api_key=' + scorecardKey.apiKey, {cache: false})
        .then(function (result) {
            var originalData = result.data.results;
            var newData = [];
            for (var i = 0; i < originalData.length; i++) {
              var dataYear = originalData[i][2014];
              var testDate = 2014
              if ((dataYear.admissions.admission_rate.overall > lowRate ) && (dataYear.academics.program_available = degree) && (dataYear.cost.attendance.academic_year <= highPrice)) {
                newData.push(originalData[i]);
              }
            }
            return newData;
        });
    }
  }
})();
