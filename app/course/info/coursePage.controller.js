(function () {
  'use strict';

  angular
      .module('distanceLearning.course')
      .controller('CourseInfoController', CourseInfoController);

  CourseInfoController.$inject = [
    '$log', '$location', '$routeParams',
    'CourseUtils', 'LoginUtils', 'FacultyListUtils', 'TeacherUtils'
  ];

  function CourseInfoController($log, $location, $routeParams,
                                CourseUtils, LoginUtils, FacultyListUtils, TeacherUtils) {
    var vm = this;
    vm.courseSlug = $routeParams.slug;
    vm.teachers = [];
    vm.facultyDirection = {};
    vm.facultyDirectionParams = {
      page: 1,
      count: 5
    };
    vm.teacherParams = {
      page: 1,
      count: 5
    };
    vm.course = {
      faculty: {
        name: 'Пертягніть факультет'
      },
      teacher: {
        name: 'Пертягніть викладача'
      }
    };
    vm.loading = true;
    vm.loadingTeachers = true;
    vm.loadingFacultyDirection = true;

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) {
        return $location.path('/home');
      }
      if ($routeParams.slug) {
        return getCourseInfo($routeParams.slug);
      }

      getTeachers();
      getFacultyDirection();

      vm.course = {
        group: {
          name: 'Пертягніть факультет'
        },
        teacher: {
          name: 'Пертягніть викладача'
        },
        subject: {
          name: 'Пертягніть предмет'
        }
      };
      vm.loading = false;
    }

    function getTeachers() {
      vm.loadingTeachers = true;

      TeacherUtils.getTeacherWithOutRandom(vm.teacherParams)
          .then(function (ok) {
            vm.teachers.data = ok.data;
            vm.teachers.total = ok.total;

            vm.loadingTeachers = false;
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.getTeachers().TeacherUtils.getTeachers()', err);
          });
    }

    function getFacultyDirection() {
      vm.loadingFacultyDirection = true;

      FacultyListUtils.getFaculties(vm.facultyDirectionParams)
          .then(function (ok) {
            vm.facultyDirection.data = ok.data.data;
            vm.facultyDirection.total = ok.data.total;

            console.log(vm.facultyDirection);

            vm.loadingFacultyDirection = false;
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.getFacultyDirection().FacultyListUtils.getFaculties()', err);
          });
    }

    function getCourseInfo(slug) {
      vm.loading = true;

      CourseUtils.getSubject(slug)
          .then(function (ok) {
            vm.course = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.getSubjectInfo().SubjectUtils.getSubject()', err);
          });
    }

    function createCourse(subject) {
      CourseUtils.createCourse(subject)
          .then(function () {
            $location.path('/admin/subject');
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.createSubject().SubjectUtils.createSubject()', err);
          });
    }

    function editSubject(subject) {
      CourseUtils.updateSubject(subject)
          .then(function () {
            vm.loading = false;

            $location.path('/admin/subject');
          }, function (err) {
            $log.log('[ERROR] SubjectInfoController.editUserSave().SubjectUtils.updateSubject()', err);
          });
    }

    vm.saveUser = function () {
      vm.loading = true;

      if (!$routeParams.slug) {
        createCourse(vm.course);
      } else {
        editSubject(vm.course);
      }
    };

    vm.cancelCourse = function () {
      $location.path('/admin/subject');
    };

    vm.jumpToFacultyPage = function (page) {
      vm.facultyDirectionParams.page = page;

      getFacultyDirection(vm.facultyDirectionParams);
    };

    vm.jumpToTeacherPage = function (page) {
      vm.teacherParams.page = page;

      getTeachers(vm.teacherParams);
    };

    vm.range = function (page) {
      if (!page) {
        return new Array(1);
      }

      var countPage = Math.floor(page / vm.facultyDirectionParams.count);
      if ((page % vm.facultyDirectionParams.count) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };

    vm.onDropComplete = function (data, event) {
      if (data.type == 'faculty') vm.course.faculty = data.faculty;
      if (data.type == 'teacher') vm.course.teacher = data.teacher;
    };

    vm.cancelCourset = function () {
      $location.path('/admin/subject');
    };

    vm.saveCourse = function () {
      console.log('save subject', vm.course);
      $location.path('/admin/subject');
    };
  }
})();
