angular.module('app').config(function ($routeProvider) { 
     var homePath =  'app/pages/';
     
    ///////////////////MAIN PAGES 
    // root
     $routeProvider
    
    .when('/', {
                templateUrl: homePath + 'home.html'
            })

    //home
            .when('/home', {
                templateUrl:  homePath + 'home.html'
            })

            //fact files
    
            .when('/factFiles', {
                templateUrl: homePath + 'roomTypes.html'
            })
            
     //image library
            .when('/imageLibrary', {
                templateUrl:homePath + 'imageLibrary.html'
            })
    
   
     //videos
            .when('/videos', {
                templateUrl:homePath + 'videos.html'
            })
          
     //contact
            .when('/contact', {
                templateUrl: homePath + 'contact.html'
            })
        
            
     //login
            .when('/login', {
                templateUrl:homePath + 'login.html'
            })
             
     //map
            .when('/map', {
                templateUrl: homePath + 'map.html'
            })
            
    ///////////////////SUB PAGES
            .when('/room-type', {
                templateUrl: homePath + 'roomTypes.html'
            })
    
            .when('/activities', {
                templateUrl: homePath + 'activities.html'
                
            })
    
             .when('/facilities', {
                templateUrl: homePath + 'facilities.html'
            })
    
             .when('/services', {
                templateUrl: homePath + 'services.html',
            })
    
            .when('/rates', {
                templateUrl: homePath + 'rates.html'
            })
    
    
             .when('/propertyLocation', {
                templateUrl: homePath + 'propertyLocation.html'
            })
            ///// details view
              .when('/roomDetails', {
                  templateUrl: homePath + 'roomDetails.html',
                  controller: 'DetailsViewController'
              })

              .when('/activityDetails', {
                  templateUrl: homePath + 'activitiesDetails.html',
                  controller: 'ActivityDetailsViewController'
              })

              .when('/facilitiesDetails', {
                  templateUrl: homePath + 'facilitiesDetails.html',
                  controller: 'FacilityDetailsViewController'
              })


            .when('#', {
                templateUrl: homePath + 'imageLibrary.html'
            })


            
        });


    