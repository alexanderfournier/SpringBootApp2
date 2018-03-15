angular.module('app.services', []).factory('Workshop', function($resource) {
  return $resource('/api/v1/workshops/:id', { id: '@id' }, {
    update: {
      method: 'PUT'
    }
  });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});
