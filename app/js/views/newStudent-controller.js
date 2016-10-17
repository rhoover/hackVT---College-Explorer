(function () {
  'use strict';

  angular
    .module('hackvt.views')
    .controller('newStudentCtrl', newStudentCtrl);

  function newStudentCtrl($timeout, diskStorage, slugify) {
    const ns = this;
    const remote = require('electron').remote;
    const firebase = remote.require('firebase');
    ns.formData = {};

    goForthAndBind();

    ///////////////////////////

    function goForthAndBind() {
      ns.gradeList = ['9', '10', '11', '12', '13', '14', '15'];
      ns.graduateList = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      ns.congrats = false;

      ns.submitNewStudent = function (dataFromForm) {
        var creationMoment = Date.now();
        var fullName = dataFromForm.firstName + ' ' + dataFromForm.lastName;
        var timeHash = creationMoment.toString();
        var createSlug = slugify.makeSlug(fullName);

        dataFromForm.creationMoment = creationMoment;
        dataFromForm.fullName = fullName
        dataFromForm.studentSlug = createSlug + timeHash;

        ns.reset = function () {
          ns.formData = {};
          ns.addNewStudentForm.$setValidity();
          ns.addNewStudentForm.$setPristine();
          ns.addNewStudentForm.$setUntouched();
        };
        ns.reset();

        ns.congrats = true;
        $timeout(function () {
            ns.congrats = false;
        }, 3000);
        console.log(dataFromForm);

        diskStorage.saveStudent('students', dataFromForm);
        firebase.database().ref('students/' + dataFromForm.studentSlug).set(dataFromForm);
      }
    }
  }
})();
