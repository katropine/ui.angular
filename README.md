angular-ui-modalWindowBinder module for AngularJS and Bootstrap
=======================================================

Multiple instances of Modal window

Demo:
http://plnkr.co/v9MDSEtsYwLS5HjAW8UL


angular-ui ultraSelect
==============================================
Advanced select-multiselect/dropdown

Requirements: AngularJS, Bootstrap, jQuery

```html
<ultra-select 
    id="us1" 
    data="data" 
    option-title="name" 
    option-unique-id="id" 
    ng-model="cnt1" 
    option-search="true" 
    option-multiselect="false"
    ></ultra-select>

<ultra-select 
    id="us2" 
    option-class="btn-warning" 
    data="data" 
    option-title="name" 
    option-unique-id="id" 
    ng-model="cnt2" 
    option-search="true" 
    option-multiselect="true"
    ></ultra-select>
    
<ultra-select
    template-url="views/ultra-select.html"  // template file, overrides the built in one
    id="us3"                                // element id, needed in case of multiple instances
    option-class="btn-warning"              // btn type 
    data="data"                             // array of objects [{id: 1, name: 'Australia'}, {id:2, name: 'Serbia'}]
    option-title="name"                     // field from 'data' to be used as item title
    option-unique-id="id"                   // field from 'data' to be used as unique identifier of data object
    ng-model="cnt3"                         // ngModel, selected data
    option-search="true"                    // show search field
    option-multiselect="true"               // multi select or single select
    ></ultra-select>
    
    template-url                            - template file, overrides the built in one
    id                                      - element id, needed in case of multiple instances
    option-class                            - btn type 
    data                                    - array of objects [{id: 1, name: 'Australia'}, {id:2, name: 'Serbia'}]
    option-title                            - field from 'data' to be used as item title
    option-unique-id                        - field from 'data' to be used as unique identifier of data object
    ng-model                                - ngModel, selected data
    option-search                           - (boolean) show search field 
    option-multiselect                      - (boolean) multi select or single select
```
Demo: http://katropine.com/angular/
