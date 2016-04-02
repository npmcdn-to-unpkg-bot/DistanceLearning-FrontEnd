(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileTeacherController', ProfileTeacherController);

  ProfileTeacherController.$inject = [
    '$log', '$location', '$mdSidenav',
    'ProfileUtils', 'ProfileTeacherUtils', 'LoginUtils', 'TestUtils'
  ];

  function ProfileTeacherController($log, $location, $mdSidenav,
                                    ProfileUtils, ProfileTeacherUtils, LoginUtils, TestUtils) {
    var vm = this;
    vm.loading = true;
    vm.currentSelectedDate = {};
    vm.user = {};
    vm.task = {
      subject: 'Правознавство',
      describe: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмыслет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текстаСайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.При создании генератора мы использовали небезызвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых клиентов недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.При создании генератора мы использовали небезызвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом постоянный количественный рост и сфера нашей активности позволяет в Равным образом постоянный количественный рост и сфера нашей активности .',
      student: 'Іванов Іван Іванович'
    };
    vm.studentContetnLoading = true;
    vm.groups = [];
    vm.currentGroup = {};
    vm.taskIconURL = './assests/images/task.png';

    init();
    function init() {
      vm.loading = true;
      vm.studentContetnLoading = true;

      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      ProfileUtils.getUserInfo()
          .then(function (ok) {
            vm.user = ok;
            vm.user.avatar = './assests/images/user_tmp.png';
            vm.user.description = 'Викладач гуманітарних наук';

            getInfo(vm.user);
          }, function (err) {
            $log.log('[ERROR] ProfileStudentController.LoginUtils.userProfile()', err);
            return $location.path('/home');
          });
    }

    function getInfo(teacher) {
      vm.loading = true;
      vm.studentContetnLoading = true;

      ProfileTeacherUtils.getGroups(teacher)
          .then(function (ok) {
            vm.groups = ok;

            vm.loading = false;
            vm.studentContetnLoading = false;
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.getInfo().ProfileTeacherUtils.getGroups()', err);
          });
    }

    vm.showStudents = function (group) {
      ProfileTeacherUtils.getStudents(group)
          .then(function (ok) {
            vm.currentGroup = ok;

            $mdSidenav('studentsContainer').toggle();
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.showStudents().ProfileTeacherUtils.getStudents()', err);
          });
    };

    vm.getStudentTasks = function (student) {
      vm.studentContetnLoading = true;
      $mdSidenav('studentsContainer').close();

      ProfileTeacherUtils.getStudentTasks(student)
          .then(function (ok) {
            vm.task = ok;

            vm.studentContetnLoading = false;
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController', err);
          });
    };

    vm.goToCreateTest = function () {
      vm.loading = true;

      $location.path('/test/create');

      /*TestUtils.createTest()
          .then(function (ok) {

            $location.path('/test/create');
          }, function (err) {
            $log.log('[ERROR] ProfileTeacherController.goToCreateTest().TestUtils.createTest()', err);
          });*/

    };
  }
})();