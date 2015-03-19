/*
 ui.katropine.form 
 UltraSelect v1.0
 (c) 2014-2015 Katropine, http://katropine.com
 License: MIT
*/
angular.module('ui.katropine.form', []).directive('ultraSelect', function ($filter) {
    var template = '<div class="dropdown">';
    template += '<button class="btn {{optionClass}} dropdown-toggle" type="button" id="{{elid}}" data-toggle="dropdown" aria-expanded="true">';
    template += '<span ng-if="selectedTitle == null">Select</span>';
    template += '<span ng-if="selectedTitle != null" ng-click="toggle()">{{selectedTitle}}</span>';
    template += '<span class="caret"></span>';
    template += '</button>&nbsp;';
    template += '<span ng-if="selectedTitle != null" class="btn btn-danger btn-xs" ng-click="unsetSelected($event)">';
    template += '<span class="glyphicon glyphicon-remove"></span>';
    template += '</span>';
    template += '<ul class="dropdown-menu" role="menu" style="max-height: 340px; overflow-y: scroll;">';
    template += '<li role="presentation">';
    template += '<div class="us-searchbox" ng-show="optionSearch">';
    template += '<input class="input-block-level form-control us-searchfield" type="text" ng-model="searchText" autocomplete="off" placeholder="Search">';
    template += '</div>';
    template += '<div ng-if="optionMultiselect" style="color:#000; padding: 3px 20px; float: right;">';
    template += '<a href="#" style="clear: both; color: #333;" ng-click="checkAll($event)"><span class="glyphicon glyphicon-check"></span> Check all</a>';
    template += '&nbsp;<a href="#" style="clear: both; color: #333;" ng-click="unCheckAll($event)"><span class="glyphicon glyphicon-unchecked"></span> Un-check all</a>';
    template += '</div>  ';
    template += '</li>';
    template += '<li ng-repeat="row in dataFiltered" role="presentation">';
    template += '<a role="menuitem" tabindex="-1" href="#" ng-click="setSelectedObject($event, row)">';
    template += '<span ng-if="optionMultiselect" ng-switch on="row._selected">';
    template += '<span ng-switch-when="1" class="glyphicon glyphicon-check"></span>';
    template += '<span ng-switch-default class="glyphicon glyphicon-unchecked"></span>&nbsp;';
    template += '<b ng-if="row._selected">{{row[optionTitle]}}</b>';
    template += '<span ng-if="!row._selected">{{row[optionTitle]}}</span>';
    template += '</span>  ';
    template += '<span ng-if="!optionMultiselect">';
    template += '{{row[optionTitle]}}';
    template += '</span>';
    template += '</a>';
    template += '</li>';
    template += '</ul>';
    template += '</div>';
    
    var LOADING = "Loading....";
    var SELECTED = " selected";
    
    return {
        restrict: 'E',
        replace: true,
        require: 'ngModel',
        scope: {
            data: '=',
            ngModel: '=',
            optionTitle: '@',
            optionUniqueId: '@',
            optionSearch: '=optionSearch',
            optionMultiselect: '=optionMultiselect'
        },
        //templateUrl: 'views/ultra-select.html',
        template: template,
        // befor compile 
        controller: function ($scope, $element, $attrs) {
            
        },
        // after compile
        link: function (scope, element, attrs, ngModel) {
            
            
            jQuery(document).on('click', '.us-searchbox input', function (e) {
                return false;
            });
            var sanityCheck = function(){
                if(attrs.optionTitle == ''){
                    throw 'Error: [UltraSelect] id is undefined';
                }
                if(attrs.optionTitle == ''){
                    throw 'Error: [UltraSelect] optionTitle is undefined';
                }
                if(attrs.optionUniqueId == ''){
                    throw 'Error: [UltraSelect] optionUniqueId is undefined';
                }                
            };
            
            sanityCheck();
            scope.$watch('data', function () {
                
                scope.dataFiltered = null;
                scope.selectedTitle = LOADING;
                if(angular.isDefined(scope.data) && scope.data.length > 0){
                    
                    scope.elid = attrs.id;
                    scope.selectedTitle = null;
                    scope.show = false;

                    scope.optionClass = (attrs.optionClass == undefined || attrs.optionClass == '') ? 'btn-default' : attrs.optionClass;

                    if (scope.optionMultiselect) {
                        scope.ngModel = {values: []};
                    }
                    
                    scope.dataFiltered = angular.copy(scope.data); 
                    newModel = angular.copy(ngModel.$modelValue);
                    if (scope.optionMultiselect) {
                        if (newModel.values.length > 0) {
                            angular.forEach(scope.dataFiltered, function (obj, i) {
                                angular.forEach(newModel.values, function (selected, j) {
                                    if(selected[scope.optionUniqueId] == obj[scope.optionUniqueId]){
                                        scope.dataFiltered[i]._selected = 1;
                                    }
                                });
                            });
                            scope.ngModel.values = newModel.values;
                            scope.selectedTitle = '';
                            setSelectedTitle();
                        }
                    } else {
                        if (newModel != undefined && newModel[scope.optionTitle] != undefined) {
                            scope.ngModel = newModel;
                            scope.selectedTitle = '';
                            setSelectedTitle(scope.ngModel);
                        }
                    }
                    
                }
            });
            
            /************* init end ********/
            
            scope.setSelectedObject = function (e, obj) {
                e.preventDefault();
                if (scope.optionMultiselect) {
                    e.stopPropagation();
                    angular.forEach(scope.dataFiltered, function (o, i) {
                        if (obj == o) {
                            if (obj._selected) {
                                scope.dataFiltered[i]._selected = 0;
                                angular.forEach(scope.ngModel.values, function (model, j) {
                                    if (scope.dataFiltered[i][scope.optionUniqueId] == model[scope.optionUniqueId]) {
                                        scope.ngModel.values.splice(j, 1);
                                    }
                                });
                            } else {
                                scope.dataFiltered[i]._selected = 1;
                                scope.ngModel.values.push(obj);
                            }
                        }
                    });
                    setSelectedTitle();
                } else {
                    scope.ngModel = obj;
                    setSelectedTitle(obj);
                }
                return false;
            };
            scope.unsetSelected = function (e) {
                scope.selectedTitle = null;
                if (scope.optionMultiselect) {
                    scope.unCheckAll(e);
                    scope.selectedTitle = null;
                } else {
                    scope.ngModel = {};
                }
            };
            var setSelectedTitle = function (obj) {
                if (scope.optionMultiselect) {
                    scope.selectedTitle = '';
                    var title = [];
                    angular.forEach(scope.ngModel.values, function (model, j) {
                        title.push(model[scope.optionTitle]);
                    });
                    if (title.length == 0) {
                    } else if (title.length < 6) {
                        scope.selectedTitle = title.join(', ');
                    } else {
                        scope.selectedTitle = title.length + SELECTED;
                    }
                } else {
                    scope.selectedTitle = obj[scope.optionTitle];
                }
                return false;
            };
            scope.$watch('searchText', function (v) {
                if (v != undefined) {
                    scope.dataFiltered = search(v);
                }
            });
            var search = function (what) {
                var regexp = new RegExp(what, 'i');
                var tmp = [];
                angular.forEach(scope.data, function (obj, i) {
                    if (obj[scope.optionTitle].search(regexp) != -1) {
                        tmp.push(obj);
                    }
                });
                return tmp;
            };
            scope.checkAll = function (e) {
                e.preventDefault();
                e.stopPropagation();
                angular.forEach(scope.dataFiltered, function (o, i) {
                    scope.dataFiltered[i]._selected = 1;
                });
                scope.ngModel.values = scope.dataFiltered;
                setSelectedTitle();
                return false;
            };
            scope.unCheckAll = function (e) {
                angular.forEach(scope.dataFiltered, function (obj, i) {
                    obj._selected = 0;
                    scope.dataFiltered[i] = obj;
                });
                scope.selectedTitle = null;
                scope.ngModel.values = [];
                e.preventDefault();
                e.stopPropagation();
                return false;
            };
        }
    };
});
