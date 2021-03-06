(function () {
  'use strict';

  angular
      .module('distanceLearning.teacher')
      .controller('TeacherController', TeacherController);

  TeacherController.$inject = [
    'TeacherUtils'
  ];

  function TeacherController(TeacherUtils) {
    var vm = this;

    TeacherUtils.getTeachers()
        .then(function (data) {
          vm.teachers = data.data;
        });
  }
})();
