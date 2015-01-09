angular-ui-modalWindowBinder module for AngularJS and Bootstrap
=======================================================

Multiple instances of Modal window

Demo:
http://plnkr.co/v9MDSEtsYwLS5HjAW8UL


angular-ui ultraSelect
==============================================
Advanced select-multiselect/dropdown

Requirements: AngularJS, Bootstrap, jQuery

Demo: http://katropine.com/angular/

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
    template-url="views/ultra-select.html"  
    id="us3"                                
    option-class="btn-warning"              
    data="data"                             
    option-title="name"                    
    option-unique-id="id"                  
    ng-model="cnt3"                         
    option-search="true"                    
    option-multiselect="true"               
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
