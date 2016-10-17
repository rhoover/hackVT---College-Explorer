(function () {
  'use strict';

  angular
    .module('hackvt.boot')
    .config(routesAndStates);

    function routesAndStates($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html'
      })
      .state('addStudent', {
        url: '/addStudent',
        templateUrl: 'templates/addStudent.html',
        controller: 'newStudentCtrl as ns'
      })
      .state('research', {
        url: '/research',
        templateUrl: 'templates/research.html',
        controller: 'researchCtrl as rs'
      })
    }
})();
