/*
 * angular-ui-modalWindowBinder
 * http://katropine.com

 * Version: 1.0.1 - 2014-04-09
 * License: MIT
 * Author: Kristian Beres
 */
angular.module('ui.modalWindowBinder', []).factory('ModalWindowBinder', ['$rootScope', '$modal', function($rootScope, $modal) {
   
    function create(settings){
      this.data = {
        result: null
      };
      this.settings =  {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        scope: (function() {
            var scope = $rootScope.$new();
            scope.data = this.data;
            return scope;
        })(),
        templateUrl: settings.tmpl,
        controller: settings.ctrl,
        windowClass: settings.windowClass
      };
      this.setTitle = function(title){
            this.settings.scope.title = title; 
      };
      this.setParams = function(params){
          this.settings.scope.params = params;
      };
      this.openDialog = function(entity) {
        this.settings.scope.entity = entity;
        return $modal.open(this.settings);
        
      }; 
   }
    
    return {create : create};
}]);
