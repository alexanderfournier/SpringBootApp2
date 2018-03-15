angular.module('app.controllers', []).controller('WorkshopListController', function($scope, $state, popupService, $window, Workshop) {
  $scope.workshops = Workshop.query(); //fetch all shipwrecks. Issues a GET to /api/vi/shipwrecks

  $scope.deleteWorkshop = function(workshop) { // Delete a Shipwreck. Issues a DELETE to /api/v1/shipwrecks/:id
    if (popupService.showPopup('Really delete this?')) {
      workshop.$delete(function() {
        $scope.workshops = Workshop.query(); 
        $state.go('workshops');
      });
    }
  };
}).controller('WorkshopViewController', function($scope, $stateParams, Workshop) {
  $scope.workshop = Workshop.get({ id: $stateParams.id }); //Get a single shipwreck.Issues a GET to /api/v1/shipwrecks/:id
}).controller('WorkShopCreateController', function($scope, $state, $stateParams, Workshop) {
  $scope.workshop = new Workshop();  //create new shipwreck instance. Properties will be set via ng-model on UI

  $scope.addWorkshop = function() { //create a new shipwreck. Issues a POST to /api/v1/shipwrecks
    $scope.workshop.$save(function() {
      $state.go('workshops'); // on success go back to the list i.e. shipwrecks state.
    });
  };
}).controller('WorkshopEditController', function($scope, $state, $stateParams, Workshop) {
  $scope.updateWorkshop = function() { //Update the edited shipwreck. Issues a PUT to /api/v1/shipwrecks/:id
    $scope.workshop.$update(function() {
      $state.go('workshops'); // on success go back to the list i.e. shipwrecks state.
    });
  };

  $scope.loadWorkshops = function() { //Issues a GET request to /api/v1/shipwrecks/:id to get a shipwreck to update
    $scope.workshop = Workshop.get({ id: $stateParams.id });
  };

  $scope.loadWorkshop(); // Load a shipwreck which can be edited on UI
});
