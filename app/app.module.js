(function () {




    var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'ngMap', 'angular-imagefit', 'ngFileSaver', 'ui.bootstrap', 'videosharing-embed', 'ngAnimate', 'dcbImgFallback', 'angular-loading-bar']);

    app.factory('dataFactory', ['$http', function ($http) {



        var dataFactory = {};


        dataFactory.getProductInfo = function () {

            return $http({
                url: 'index.aspx/GetProductInfo',
                method: 'POST',
                cache: true,
                //params: params,
                data: {}

            })
        };

        dataFactory.getFacts = function () {

            return $http({
                url: 'index.aspx/GetFacts',
                method: 'POST',
                cache: true,
                //params: params,
                data: {}

            })
        };

        dataFactory.getOptionDetails = function (prodOptionId, ccId) {
            var detailsParams = {
                'prodOptionId': prodOptionId, //'12676',
                'ccId': ccId // '1013' //breakfast
            };
            return $http({
                url: 'index.aspx/GetDetails',
                method: 'POST',
                cache: true,

                data: detailsParams
                // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        }

        dataFactory.getOptionImages = function (prodOptionId) {
            var detailsParams = {
                'prodOptionId': prodOptionId, 
               
            };
            return $http({
                url: 'index.aspx/GetOptionImages',
                method: 'POST',
                cache: true,

                data: detailsParams
                // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        }

         dataFactory.getFacilityDetails = function (prodOptionId) {
            var detailsParams = {
                'prodOptionId': prodOptionId
               
            };
            return $http({
                url: 'index.aspx/GetFacilityDetails',
                method: 'POST',
                cache: true,

                data: detailsParams
                // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        }


         dataFactory.getActivityDetails = function (prodOptionId) {
            var detailsParams = {
                'prodOptionId': prodOptionId
               
            };
            return $http({
                url: 'index.aspx/GetActivityDetails',
                method: 'POST',
                cache: true,

                data: detailsParams
                // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        }


        dataFactory.getRoomDetails = function (prodOptionId) {
            console.log("getRoomDetails " + prodOptionId);
            var detailsParams = {
                'prodOptionId': prodOptionId
               
            };
            return $http({
                url: 'index.aspx/GetRoomDetails',
                method: 'POST',
                cache: true,

                data: detailsParams
                // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        }

          dataFactory.getMapDetails = function (productId) {
            console.log("getMapDetails " + productId);
            var detailsParams = {
                'prodOptionId': productId
               
            };
            return $http({
                url: 'index.aspx/GetMapInfo',
                method: 'POST',
                cache: true,

                data: {}
                // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        }


        return dataFactory;


       
      

    } ]);

    app.factory('RoomInfo', function () {
        function Factory($scope) {
            this.$scope = $scope;
        }

        Factory.prototype.getNumberOfRooms = function (optionId, contentCollectionId) {
            
        };

    });

    app.factory('ProductInfo', function () {

        function Factory($scope) {
            //console.log("ProductInfo Scope" + $scope.logo);
            this.$scope = $scope;
        }

        Factory.prototype.getHiResOptionImage = function(optionId)
        {
           var imageFileName = "";
           var retValue = "images/placeholder.jpg";
           var imagePath = 'http://www.didgigo.com/ProductImages//Uploaded//';
          
           if (optionId) {
                var imageObj = new Object();


                var optArr = this.$scope.option;
                if (optArr) {
                    for (var i = 0; i < optArr.length; i++) {
                        var option = optArr[i];
                        if (option.Option_Id === optionId) {
                            imageObj = optArr[i];
                            break;

                        }

                    } //end for loop

                    if (imageObj.Product_Image) {
                        imageFileName  =  imagePath + imageObj.Product_Image.replace(/ /g, '%20');

                    } else {
                        imageFileName = "images/placeholder.jpg";
                    }
                }

            }
            //console.log("getHiResOptionImage" + imageFileName)
            return imageFileName = imageFileName ? imageFileName : false;
        }
        Factory.prototype.getOptionImage = function (optionId) {
            var imageFileName = "";
            var imagePath = 'http://www.didgigo.com/ProductImages//Uploaded//';
            var imagePathThumbs = 'http://www.didgigo.com/ProductImages//Thumbnails//';

            if (optionId) {
                var imageObj = new Object();


                var optArr = this.$scope.option;
                if (optArr) {
                    for (var i = 0; i < optArr.length; i++) {
                        var option = optArr[i];
                        if (option.Option_Id === optionId) {
                            imageObj = optArr[i];
                            break;

                        }

                    } //end for loop

                    if (imageObj.Product_Image) {
                        imageFileName = imagePathThumbs + imageObj.Product_Image.replace(/ /g, '%20').replace(".jpg", "_thumblowres.jpg").replace(".png", "_thumblowres.png");

                    } else {
                        imageFileName = "images/placeholder.jpg";
                    }
                }

            }

            return imageFileName = imageFileName ? imageFileName : false;
        };


        Factory.prototype.getRoomDescription = function (optionid) {
            var desc = false;
            if (optionid) {
                var obj = this.getRoomDetails(optionid);
                //console.log("Obj getRoomDetails" + JSON.stringify(obj));
                if (obj) {
                    desc = obj.Description[0];
                    return desc;
                }
            }

            return desc;
        }
        Factory.prototype.getRoomDetails = function (optionid) {
            var roomObj = new Object();


            if (optionid) {
                //search for the room
                for (var i = 0; i < this.$scope.details.length; i++) {

                    var Option_Id = this.$scope.details[i].Option_Id;
                    if (parseInt(Option_Id) === parseInt(optionid)) {
                        roomObj = this.$scope.details[i];

                        return roomObj;
                    }
                } //end for loop
            }
            return roomObj;
        }

        Factory.prototype.getRoomList = function () {
            //JSON.stringify(this.$scope.detailsgetRoomList

            var roomList = [];
            for (var i = 0; i < this.$scope.details.length; i++) {
                var optionType = this.$scope.details[i].Option_Type;
                //console.log(optionType);
                if (optionType === "Room") {
                    roomList.push(this.$scope.details[i]);
                }
                //console.log(JSON.stringify(this.$scope.details..Option_Type));
            }

            return roomList;
        }

        Factory.prototype.getActivityList = function () {
            //JSON.stringify(this.$scope.detailsgetRoomList

            var ActivityList = [];
            for (var i = 0; i < this.$scope.details.length; i++) {
                var optionType = this.$scope.details[i].Option_Type;
                //console.log(optionType);
                if (optionType === "Activities and Other") {
                    ActivityList.push(this.$scope.details[i]);
                }
                //console.log(JSON.stringify(this.$scope.details..Option_Type));
            }

            return ActivityList;
        }


        Factory.prototype.getFacilityList = function () {
            //JSON.stringify(this.$scope.detailsgetRoomList

            var FacilityList = [];
            for (var i = 0; i < this.$scope.details.length; i++) {
                var optionType = this.$scope.details[i].Option_Type;
                //console.log(optionType);
                if (optionType !== "Room" && optionType !==  "Activities and Other") {
                    FacilityList.push(this.$scope.details[i]);
                }
                //console.log(JSON.stringify(this.$scope.details..Option_Type));
            }

            return FacilityList;
        }

        Factory.prototype.getEmail = function () {
            //console.log("Get Email Scope: " + this.$scope);
            //console.log("Get Email: " + this.$scope.Email);
            return this.$scope.Email;
        }

        Factory.prototype.getPhone = function () {
            return this.$scope.Phone;
        }

        Factory.prototype.getRating = function () {
            return this.$scope.Rating;
        }
        Factory.prototype.getHighResThumbRef = function () {
            var logoRef = "images/LogoPlaceHolder.jpg";
            if (this.$scope.logo && this.$scope.logo != undefined) {
                logoRef = "../ProductLogos/Uploaded/" + (this.$scope.logo);
            }
            return logoRef;
        }

        Factory.prototype.getFullAddress = function () {
            var fullAddress = this.$scope.Address + " " + this.$scope.City + " " + this.$scope.State + " " + this.$scope.Country + " " + this.$scope.Post_Code;
            return fullAddress;
        }

        Factory.prototype.getLogoThumbRef = function () {
            var thumbRef = "images/LogoPlaceHolder.jpg";
           
            if (this.$scope.logo && this.$scope.logo != undefined) {
                thumbRef = "../ProductLogos/Thumbnails/" + (this.$scope.logo).replace(".jpg", "_thumb.jpg").replace(".png", "_thumb.png");
            }
            return thumbRef;
        }

        Factory.prototype.getLogo = function () {
            this.$scope.logo;
            return this.$scope.logo;
        }

        Factory.prototype.getProductHomePageDescription = function () {
            return this.$scope.productDescription[0]
        }
        Factory.prototype.convertDMStoDegrees = function (days, minutes, seconds, direction) {
            //console.log(days + minutes + seconds + direction);
            direction.toUpperCase();

            var dd = parseInt(days) + parseInt(minutes) / 60 + parseInt(seconds) / (60 * 60);
            //alert(dd);
            if (direction == "S" || direction == "W") {
                dd = dd * -1;
            } // Don't do anything for N or E

            //console.log("dd" + dd);
            return dd;
        }
        Factory.prototype.getDegreeCoordinates = function () {
            var retValue = false;
            var objCoordinates = new Object();

            if (this.$scope.Product_Latitude && this.$scope.Product_Longitude) {


                objCoordinates.lat = (this.$scope.Product_Latitude).toString();
                objCoordinates.long = (this.$scope.Product_Longitude).toString();

                retValue = objCoordinates;
            }

            if (this.$scope.GPS_DMS_Lat_Degrees &&
                     this.$scope.GPS_DMS_Lat_Min &&
                     this.$scope.GPS_DMS_Lat_Notation &&
                     this.$scope.GPS_DMS_Lat_Sec &&
	                 this.$scope.GPS_DMS_Long_Degrees &&
                     this.$scope.GPS_DMS_Long_Min &&
	                 this.$scope.GPS_DMS_Long_Notation &&
      	             this.$scope.GPS_DMS_Long_Sec

                  ) {

                var lat = convertDMStoDegrees(this.$scope.GPS_DMS_Lat_Degrees, this.$scope.GPS_DMS_Lat_Min, this.$scope.GPS_DMS_Lat_Sec, this.$scope.GPS_DMS_Lat_Notation),
                    long = convertDMStoDegrees(this.$scope.GPS_DMS_Long_Degrees, this.$scope.GPS_DMS_Long_Min, this.$scope.GPS_DMS_Long_Sec, this.$scope.GPS_DMS_Long_Notation);

                objCoordinates.lat = lat;
                objCoordinates.long = long;
                retValue = objCoordinates;
            }
            return retValue;
        }

        return Factory;
    });

    //to preserve the url parameters
    app.run(function ($rootScope, $location) {
        //$rootScope.test = new Date();

        var locationSearch;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //save location.search so we can add it back after transition is done
            locationSearch = $location.search();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //restore all query string parameters back to $location.search
            $location.search(locationSearch);
        });
    })

    app.filter('capitalize', function () {
        //First word only: Hello, world.
        return function (input, all) {
            var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
            return (!!input) ? input.replace(reg, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }) : '';
        }
    });


    app.filter('split', function () {
        return function (input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index             
            return input.split(splitChar)[splitIndex];
        }
    });

    app.filter('returnTrueOrFalseWithYorN', function () {
        return function (text) {


            return text === 'Y' ? true : false;
        };
    })

    app.filter('replaceNull', function () {
        return function (text) {
            text = text.toString();
            var str = text.replace('null', '');
            return str.toLowerCase();
        };
    })

    app.filter('replaceNonNullWithTrue', function () {
        return function (text) {

            if (text && text.length > 0 && text != 'null') {
                return true;
            } else {
                return false;
            }

        };
    })
    app.filter('orderObjectBy', function () {
        return function (input, attribute) {
            if (!angular.isObject(input)) return input;

            var array = [];
            for (var objectKey in input) {
                array.push(input[objectKey]);
            }

            array.sort(function (a, b) {
                a = parseInt(a[attribute]);
                b = parseInt(b[attribute]);
                return a - b;
            });
            return array;
        }
    });

    app.filter('groupBy', ['$parse', function ($parse) {
        return function (list, group_by) {

            var filtered = [];
            var prev_item = null;
            var group_changed = false;
            // this is a new field which is added to each item where we append "_CHANGED"
            // to indicate a field change in the list
            //was var new_field = group_by + '_CHANGED'; - JB 12/17/2013
            var new_field = 'group_by_CHANGED';

            // loop through each item in the list
            angular.forEach(list, function (item) {

                group_changed = false;

                // if not the first item
                if (prev_item !== null) {

                    // check if any of the group by field changed

                    //force group_by into Array
                    group_by = angular.isArray(group_by) ? group_by : [group_by];

                    //check each group by parameter
                    for (var i = 0, len = group_by.length; i < len; i++) {
                        if ($parse(group_by[i])(prev_item) !== $parse(group_by[i])(item)) {
                            group_changed = true;
                        }
                    }


                } // otherwise we have the first item in the list which is new
                else {
                    group_changed = true;
                }

                // if the group changed, then add a new field to the item
                // to indicate this
                if (group_changed) {
                    item[new_field] = true;
                } else {
                    item[new_field] = false;
                }

                filtered.push(item);
                prev_item = item;

            });

            return filtered;
        };
    } ]);

    app.factory('Utils', function ($q) {
        return {
            isImage: function (src) {

                var deferred = $q.defer();

                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                };
                image.onload = function () {
                    deferred.resolve(true);
                };
                image.src = src;

                return deferred.promise;
            }
        };
    });

    

    app.directive('onErrorSrc', function() {
        return {
            link: function(scope, element, attrs) {
              element.bind('error', function() {
                if (attrs.src != attrs.onErrorSrc) {
                  attrs.$set('src', attrs.onErrorSrc);
                }
              });
            }
        }
    });



app.directive('bgImage', function () {
    return {
        link: function(scope, element, attr) {
            
            attr.$observe('bgImage', function() {           
                if (!attr.bgImage) {
                    // No attribute specified, so use default "images/placeholder.jpg"
                    element.css("background-image","url(images/placeholder.jpg)");
                } else {
                    var image = new Image();  
                    image.src = attr.bgImage;

                    

                    image.onload = function() { 
                        console.log("onload: " + attr.bgImage);
                        //Image loaded- set the background image to it
                        element.css("background-image","url("+attr.bgImage+")");
                    };
                    image.onerror = function() {
                        
                        
                        var hiResImage = attr.bgImage.replace("_thumblowres.jpg", ".jpg").replace("_thumblowres.png",".png").replace("Thumbnails", "Uploaded");
                      
                       
                        //Image failed to load- use default
                        element.css("background-image","url("+hiResImage+")");
                    };
                }
            });
        }
    };
});


app.directive('bgImage2', function () {
    return {
        link: function(scope, element, attr) {
            
            attr.$observe('bgImage2', function() {           
                if (!attr.bgImage2) {
                    // No attribute specified, so use default "images/placeholder.jpg"
                    element.css("background-image","url(images\Profile.jpg)");
                } else {
                    var image = new Image();  
                    image.src = attr.bgImage2;

                    

                    image.onload = function() { 
                        console.log("onload: " + attr.bgImage2);
                        //Image loaded- set the background image to it
                        element.css("background-image","url("+attr.bgImage2+")");
                    };
                    image.onerror = function() {
                        
                        
                        var hiResImage = attr.bgImage.replace("_thumb.jpg", ".jpg").replace("_thumb.png",".png").replace("Thumbnails", "Uploaded");
                      
                       
                        //Image failed to load- use default
                        element.css("background-image","url("+hiResImage+")");
                    };
                }
            });
        }
    };
});
/**map **/
app.directive('myMap', function() {
    // directive link function
    
    var link = function(scope, element, attrs) {
        
        var map, infoWindow, marker;
        var markers = [];
        
        // map config
        var mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        
        // init the map
        function initMap() {
           

            if( attrs.lat && attrs.long  )
            {
           
                mapOptions = {
                    center: new google.maps.LatLng(attrs.lat, attrs.long),
                    zoom: parseInt(attrs.zoom) 
                };
                map = new google.maps.Map(element[0], mapOptions);
                
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng( attrs.sam, attrs.sam2),
                    map: map
                });

                var markerIcons = { 'red': 'red-dot.png',
                        'blue': 'blue-dot.png',
                        'green': 'green-dot.png'

                };
                 var iconURL = 'http://maps.google.com/mapfiles/ms/icons/';
                 var color = attrs.mcolor;
                 var icon = color ? color.toLowerCase() : "red";
                 marker.setIcon(iconURL + markerIcons[icon]);

                 map.addListener('zoom_changed', function () {
                    $('.zoom').val(map.getZoom());
           
                });

                 map.addListener('center_changed', function () {
                     var mapPos = map.center;
                     var markerPos = marker.position;

                     $('.coor1').val( mapPos.lat );
                     $('.coor2').val( mapPos.lng );
                 });

                var staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap";
                      //Set the Google Map Center.
                      staticMapUrl += "?center=" + $('.coor1').val() + "," + $('.coor2').val();
                      //Set the Google Map Size.
                      staticMapUrl += "&size=640x480&scale=2";
                      //Set the Google Map Type.
                      staticMapUrl += "&maptype=roadmap";

                      //Set the Google Map Zoom.
                      staticMapUrl += "&zoom=" + $('.zoom').val();

                      //Loop and add Markers.
                      var color = $('.markerColor').val();
                      var icon = color != null ? color.toLowerCase() : "red";

                      staticMapUrl += "&markers=color:" + icon + "%7C" + $('.marker1').val() + "," + $('.marker2').val();
                      $('#MapGmapsUrlTb').val( staticMapUrl );
                      
            }

        }    
        
        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array
           
        }
        
        // show the map and place some markers
        initMap();
    };
    
  
    
      return {
        scope: {
           lat: '@lat',
           long: '@long',
           zoom: '@zoom',
           sam: '@sam',
           sam2: '@sam2',
           mcolor:'@mcolor'
        },  // use a new isolated scope
        restrict: 'AE',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
       
    };
});
 /*** preloader ***/
app.directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }]);

/**image load**/
app.factory(
            "preloader",
            function( $q, $rootScope ) {
                // I manage the preloading of image objects. Accepts an array of image URLs.
                function Preloader( imageLocations ) {
                    // I am the image SRC values to preload.
                    this.imageLocations = imageLocations;
                    // As the images load, we'll need to keep track of the load/error
                    // counts when announing the progress on the loading.
                    this.imageCount = this.imageLocations.length;
                    this.loadCount = 0;
                    this.errorCount = 0;
                    // I am the possible states that the preloader can be in.
                    this.states = {
                        PENDING: 1,
                        LOADING: 2,
                        RESOLVED: 3,
                        REJECTED: 4
                    };
                    // I keep track of the current state of the preloader.
                    this.state = this.states.PENDING;
                    // When loading the images, a promise will be returned to indicate
                    // when the loading has completed (and / or progressed).
                    this.deferred = $q.defer();
                    this.promise = this.deferred.promise;
                }
                // ---
                // STATIC METHODS.
                // ---
                // I reload the given images [Array] and return a promise. The promise
                // will be resolved with the array of image locations.
                Preloader.preloadImages = function( imageLocations ) {
                    var preloader = new Preloader( imageLocations );
                    return( preloader.load() );
                };
                // ---
                // INSTANCE METHODS.
                // ---
                Preloader.prototype = {
                    // Best practice for "instnceof" operator.
                    constructor: Preloader,
                    // ---
                    // PUBLIC METHODS.
                    // ---
                    // I determine if the preloader has started loading images yet.
                    isInitiated: function isInitiated() {
                        return( this.state !== this.states.PENDING );
                    },
                    // I determine if the preloader has failed to load all of the images.
                    isRejected: function isRejected() {
                        return( this.state === this.states.REJECTED );
                    },
                    // I determine if the preloader has successfully loaded all of the images.
                    isResolved: function isResolved() {
                        return( this.state === this.states.RESOLVED );
                    },
                    // I initiate the preload of the images. Returns a promise.
                    load: function load() {
                        // If the images are already loading, return the existing promise.
                        if ( this.isInitiated() ) {
                            return( this.promise );
                        }
                        this.state = this.states.LOADING;
                        for ( var i = 0 ; i < this.imageCount ; i++ ) {
                            this.loadImageLocation( this.imageLocations[ i ] );
                        }
                        // Return the deferred promise for the load event.
                        return( this.promise );
                    },
                    // ---
                    // PRIVATE METHODS.
                    // ---
                    // I handle the load-failure of the given image location.
                    handleImageError: function handleImageError( imageLocation ) {
                        this.errorCount++;
                        // If the preload action has already failed, ignore further action.
                        if ( this.isRejected() ) {
                            return;
                        }
                        this.state = this.states.REJECTED;
                        this.deferred.reject( imageLocation );
                    },
                    // I handle the load-success of the given image location.
                    handleImageLoad: function handleImageLoad( imageLocation ) {
                        this.loadCount++;
                        // If the preload action has already failed, ignore further action.
                        if ( this.isRejected() ) {
                            return;
                        }
                        // Notify the progress of the overall deferred. This is different
                        // than Resolving the deferred - you can call notify many times
                        // before the ultimate resolution (or rejection) of the deferred.
                        this.deferred.notify({
                            percent: Math.ceil( this.loadCount / this.imageCount * 100 ),
                            imageLocation: imageLocation
                        });
                        // If all of the images have loaded, we can resolve the deferred
                        // value that we returned to the calling context.
                        if ( this.loadCount === this.imageCount ) {
                            this.state = this.states.RESOLVED;
                            this.deferred.resolve( this.imageLocations );
                        }
                    },
                    // I load the given image location and then wire the load / error
                    // events back into the preloader instance.
                    // --
                    // NOTE: The load/error events trigger a $digest.
                    loadImageLocation: function loadImageLocation( imageLocation ) {
                        var preloader = this;
                        // When it comes to creating the image object, it is critical that
                        // we bind the event handlers BEFORE we actually set the image
                        // source. Failure to do so will prevent the events from proper
                        // triggering in some browsers.
                        var image = $( new Image() )
                            .load(
                                function( event ) {
                                    // Since the load event is asynchronous, we have to
                                    // tell AngularJS that something changed.
                                    $rootScope.$apply(
                                        function() {
                                            preloader.handleImageLoad( event.target.src );
                                            // Clean up object reference to help with the
                                            // garbage collection in the closure.
                                            preloader = image = event = null;
                                        }
                                    );
                                }
                            )
                            .error(
                                function( event ) {
                                    // Since the load event is asynchronous, we have to
                                    // tell AngularJS that something changed.
                                    $rootScope.$apply(
                                        function() {
                                            preloader.handleImageError( event.target.src );
                                            // Clean up object reference to help with the
                                            // garbage collection in the closure.
                                            preloader = image = event = null;
                                        }
                                    );
                                }
                            )
                            .prop( "src", imageLocation )
                        ;
                    }
                };
                // Return the factory instance.
                return( Preloader );
            }
        );


})();  

  
   