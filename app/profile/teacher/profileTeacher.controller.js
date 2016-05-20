(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileTeacherController', ProfileTeacherController);

  ProfileTeacherController.$inject = [
    '$log', '$location',
    '$mdSidenav', '$mdDialog', '$mdToast',
    'ProfileUtils', 'ProfileTeacherUtils', 'LoginUtils', 'TestUtils'
  ];

  function ProfileTeacherController($log, $location,
                                    $mdSidenav, $mdDialog, $mdToast,
                                    ProfileUtils, ProfileTeacherUtils, LoginUtils, TestUtils) {
    var vm = this;
    vm.loading = true;
    vm.currentSelectedDate = {};
    vm.subjectIconURL = '../assests/images/ic_school_black_24px.svg';
    vm.groupIconURL = '../assests/images/ic_people_black_48px.svg';
    vm.studentIconURL = '../assests/images/ic_person_outline_black_24px.svg';
    vm.teacher = {
        avatar: '../assests/images/user_tmp.png',
        description: 'Викладач гуманітарних наук'
    };
    vm.treeControl = {
      data: [
        { id: 1,
          name: 'OOP',
          type: 'subject',
          children: [
            { id: 11, name: 'Group 1', type: 'group', children: [
              { id: 111, name: 'User 1', type: 'student', children: [] }
            ] },
            { id: 12, name: 'Group 2', type: 'group', children: [] },
            { id: 13, name: 'Group 3', type: 'group', children: [] }
          ]},
        { id: 2,
          name: 'math',
          type: 'subject',
          children: [
            { id: 21, name: 'Group 21', type: 'group', children: [
              { id: 222, name: 'User 21', type: 'student', children: [] }
            ] },
            { id: 22, name: 'Group 22', type: 'group', children: [] },
            { id: 23, name: 'Group 23', type: 'group', children: [] }
          ]}
      ],
      options: {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
          ul: "outline-off",
          li: "outline-off",
          liSelected: "outline-off text-with-style",
          iExpanded: "outline-off",
          iCollapsed: "outline-off",
          iLeaf: "outline-off",
          label: "outline-off",
          labelSelected: "outline-off"
        }
      }
    };

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      ProfileUtils.getUserInfo()
          .then(function (teacher) {
            vm.teacher = teacher;
            vm.teacher.avatar = './assests/images/user_tmp.png';
            vm.teacher.description = 'Викладач гуманітарних наук';

            //getSubjectWithGroups(vm.teacher);
            getTeacherModule(vm.teacher);

            console.log(vm.teacher);
            // TODO: remove when getSubjectWithGroups() uncomment
            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] ProfileStudentController.LoginUtils.userProfile()', err);
            return $location.path('/home');
          });
    }

    function getSubjectWithGroups(teacher) {
      vm.loading = true;

      ProfileTeacherUtils.getSubjectsWithGroups(teacher)
          .then(function (ok) {
            vm.treeControl.data = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.getInfo().ProfileTeacherUtils.getGroups()', err);
          });
    }

    function getTeacherModule(teacher) {
      vm.teacherModuleLoading = true;
      teacher.modules = [
        {
          id: 1,
          name: 'Module 1',
          items: [
            { id: 11, name: 'Module 1 - 1' },
            { id: 12, name: 'Module 1 - 2' },
            { id: 13, name: 'Module 1 - 3' }
          ]
        },
        {
          id: 2,
          name: 'Module 2',
          items: [
            { id: 21, name: 'Module 2 - 1' },
            { id: 22, name: 'Module 2 - 2' },
            { id: 23, name: 'Module 2 - 3' }
          ]
        },
        {
          id: 3,
          name: 'Module 3',
          items: [
            { id: 31, name: 'Module 3- 1' },
            { id: 32, name: 'Module 3 - 2' },
            { id: 33, name: 'Module 3 - 3' }
          ]
        }
      ];
      vm.teacherModuleLoading = false;

      //ProfileTeacherUtils.getTeacherModule()
      //    .then(function (module) {
      //      teacher.module = module;
      //
      //      vm.teacherModuleLoading = false;
      //    }, function (err) {
      //      $log.log('[ERROR] ProfileTeacherController.getTeacherModule().ProfileTeacherUtils.getTeacherModule()', err);
      //    });
    }

    function getTasks(group) {
      ProfileTeacherUtils.getTasks(group)
          .then(function (tasks) {
            vm.tasks = tasks;
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.getTasks()', err);
          });
    }

    function setupTaskForGroup(data) {
      ProfileTeacherUtils.setupTaskForGroup(data)
          .then(function (ok) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Завдання ' + data.data.name + ' для ' + data.target.name + 'збережено')
                    .hideDelay(3000)
            );
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.setupTaskForGroup().ProfileTeacherUtils.setupTaskForGroup()', err);
          });
    }

    function setupTaskForStudent(data) {
      ProfileTeacherUtils.setupTaskForStudent(data)
          .then(function (ok) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Завдання ' + data.data.name + ' для ' + data.target.name + 'збережено')
                    .hideDelay(3000)
            );
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.setupTaskForGroup().ProfileTeacherUtils.setupTaskForGroup()', err);
          });
    }

    vm.goToCreateTest = function () {
      vm.loading = true;

      TestUtils.createTest()
          .then(function (ok) {
            console.log(ok);
            $location.path('/test/' + ok.code + '/edit');
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.goToCreateTest().TestUtils.createTest()', err);
          });

    };

    vm.onDropComplete = function (module, event, target) {
      module.target = target;

      $mdDialog.show(
          $mdDialog.confirm()
              .title('Завдання')
              .textContent(module.data.name + ' для ' + module.target.name)
              .ok('Підтвердити')
              .cancel('Відмінити')
      ).then(function () {
        if (target.type == 'group') { return setupTaskForGroup(module); }
        if (target.type == 'student') { return setupTaskForStudent(module); }
      });
    };

    vm.canNgDrop = function (node) {
      return node.type != 'subject';
    }
  }
})();