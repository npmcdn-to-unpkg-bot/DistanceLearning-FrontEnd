(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyList')
      .controller('FacultyPageInfoController', FacultyPageInfoController);

  FacultyPageInfoController.$inject = [
    '$routeParams', '$location', '$log', '$mdSidenav',
    'LoginUtils', 'FacultyListUtils'
  ];

  function FacultyPageInfoController($routeParams, $location, $log, $mdSidenav,
                                     LoginUtils, FacultyListUtils) {
    var vm = this;
    var facultySlug = $routeParams.slug;
    vm.removeDirectionIconURL = './assests/images/ic_delete_black_24px.svg';
    vm.createDirectionIconURL = './assests/images/ic_add_black_18px.svg';
    vm.loading = true;
    vm.loadingDirections = true;
    vm.faculty = {};
    vm.direction = {};

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      getFaculty(facultySlug);
    }

    function getFaculty(facultySlug) {
      vm.loading = true;

      FacultyListUtils.getFacultyBySlug(facultySlug)
          .then(function (ok) {
            vm.faculty = ok.data;

            vm.loading = false;
            vm.loadingDirections = false;
          }, function (err) {
            $log.log('[ERROR] FacultyPageInfoController.getFaculty().FacultyListUtils.getFacultyBySlug()', err);
          });
    }

    vm.cancelUpdateFaculty = function () {
      $location.path('/admin/faculties');
    };

    vm.saveFaculty = function() {
      FacultyListUtils.updateAdminFaculty(vm.faculty)
          .then(function () {
            $location.path('/admin/faculties');
          }, function (err) {
            $log.log('[ERROR] FacultyPageInfoController.saveFaculty().FacultyListUtils.updateAdminFaculty()', err);
          });
    };

    vm.directionInfo = function directionInfo(direction) {
      //vm.loadingDirections = true;
      vm.direction = direction;

      $mdSidenav('directionInfoSidenav').toggle();


      //FacultyListUtils.getDirectionInfo(direction)
      //    .then(function (ok) {
      //      console.log(ok);
      //
      //      vm.loadingDirections = false;
      //    }, function (err) {
      //      $log.log('[ERROR] FacultyPageInfoController.directionInfo().FacultyListUtils.getDirectionInfo()', err);
      //    });
    };

    vm.editDirectionName = function(newName) {
      if (!newName) { vm.direction.name = 'Назва направлення'; }
      else { vm.direction.name = newName; }
    };

    vm.removeDirection = function () {
      vm.loadingDirections = true;

      $mdSidenav('directionInfoSidenav')
          .close()
          .then(function () {
            FacultyListUtils.removeDirection(vm.direction)
                .then(function (ok) {
                  getFaculty(facultySlug);
                }, function (err) {
                  $log.log('[ERROR] FacultyPageInfoController.removeDirection().$mdSidenav.then().FacultyListUtils.removeDirection()', err);
                });
          });
    };

    vm.createDirection = function () {
      vm.direction.name = 'Назва направлення';
      vm.direction.faculty = vm.faculty.id;
      vm.direction.description = '';

      $mdSidenav('directionCreateSidenav').toggle();
    };

    vm.saveNewDirection = function () {
      $mdSidenav('directionCreateSidenav')
          .close()
          .then(function () {
            FacultyListUtils.createDirection(vm.direction)
                .then(function (ok) {
                  getFaculty(facultySlug);
                }, function (err) {
                  $log.log('[ERROR] FacultyPageInfoController.removeDirection().$mdSidenav.then().FacultyListUtils.removeDirection()', err);
                });
          });
    };
  }
})();
