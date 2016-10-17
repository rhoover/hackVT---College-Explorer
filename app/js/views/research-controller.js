(function () {
  'use strict';

  angular
    .module('hackvt.views')
    .controller('researchCtrl', researchCtrl);

  function researchCtrl( $timeout, scoreCardFetch, slugify, diskStorage) {
    const rs = this;
    const remote = require('electron').remote;
    const firebase = remote.require('firebase');

    goForthAndBind();

    ///////////////////////////

    function goForthAndBind() {
      var states = diskStorage.fetchDataFile('states');
      rs.stateList = states;
      rs.degreeList = [{name: 'Associates', abbr: 'assoc'}, {name: 'Bachelors', abbr: 'bachelors'}, {name:'Both', abbr:'assoc_or_bachelors'}];
      rs.rateList = ['5','10','20','30','40','50','60','70','80','90'];
      rs.priceList = ['20000', '30000', '40000', '50000', '60000', '70000', '80000'];
      rs.congrats = false;
      rs.dataSuccess = false;

      rs.submitResearchParams = function (dataFromForm) {
        console.log(dataFromForm);
        delete dataFromForm.state.$$hashKey;
        scoreCardFetch.fetchData(dataFromForm)
          .then(function success(incomingData) {
            for (var i = 0; i < incomingData.length; i++) {
              delete incomingData[i][1996];
              delete incomingData[i][1997];
              delete incomingData[i][1998];
              delete incomingData[i][1999];
              delete incomingData[i][2000];
              delete incomingData[i][2001];
              delete incomingData[i][2002];
              delete incomingData[i][2003];
              delete incomingData[i][2004];
              delete incomingData[i][2005];
              delete incomingData[i][2006];
              delete incomingData[i][2007];
              delete incomingData[i][2008];
              delete incomingData[i][2009];
              delete incomingData[i][2010];
              delete incomingData[i][2011];
              delete incomingData[i][2012];
              delete incomingData[i][2013];
              delete incomingData[i][2014].completion;
              delete incomingData[i][2014].earnings;
              delete incomingData[i][2014].repayment;
              delete incomingData[i][2014].student;
            }
            var creationMoment = Date.now();
            incomingData.creationMoment = creationMoment;

            var hash = creationMoment.toString();
            var createSlug = slugify.makeSlug(dataFromForm.state.name);
            incomingData.searchSlug = createSlug + hash;

            var info = {};
            for (var i = 0; i < incomingData.length; i++) {
              incomingData[i].info = incomingData[i][2014];
              incomingData[i].info.admissions.admission_rate.overall = incomingData[i].info.admissions.admission_rate.overall*100;
              delete incomingData[i][2014];
            }
            console.log(incomingData);

            diskStorage.saveSearch('searches', incomingData);
            firebase.database().ref('searches/' + incomingData.searchSlug).set(incomingData);

            return incomingData;
          })
          .then(function success(data) {
            rs.reset = function () {
              rs.formData = {};
              rs.researchForm.$setValidity();
              rs.researchForm.$setPristine();
              rs.researchForm.$setUntouched();
            };
            rs.reset();

            $timeout(function () {
                rs.congrats = true;
            }, 3000);

            rs.dataSuccess = true;
            rs.resultsList = data;
            console.log('thennable Data', data);
          });


      }
    }
  }
})();
