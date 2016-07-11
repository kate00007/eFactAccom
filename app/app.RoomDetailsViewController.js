(function () {
    'use strict';
 
    var app = angular.module('app');
    app.controller('DetailsViewController', ['$scope', '$http', '$routeParams', '$route', 'dataFactory', 'Utils', function ($scope, $http, $routeParams, $route, dataFactory, Utils) {

        var Room = {};
        $scope.Room = {};

        //console.log("Product Option Id" + $routeParams.productOptionId);

        if ($routeParams.productOptionId) {
            //10351
            dataFactory.getRoomDetails($routeParams.productOptionId)
                .success(function (data, status, headers, config) {
                    $scope.ShowError(""); 
                    Room = JSON.parse(data.d);
                    //main info
                    $scope.Room.RoomName = Room.Option_Name;
                    $scope.Room.ShortDescription = Room.shortDescription;
                    $scope.Room.LongDescription = Room.longDescription;
                    $scope.Room.Classification = Room.Classification;
                    $scope.Room.NumberOfRooms = Room.Number_of_Rooms;
                    $scope.Room.RoomSize = Room.Room_Size;

                    //room overview
                    $scope.Room.RoomDetails = Room.roomOverview || "";
                    $scope.Room.RoomFeatures = Room.roomFeature || "";
                    $scope.Room.RoomFacilities = Room.roomFacilities || "";
                    $scope.Room.RoomProvisions = Room.roomProvisions || "";
                    $scope.Room.RoomSpaces = Room.roomSpaces || "";
                    $scope.Room.Access = Room.roomAccess || "";
                    $scope.Room.RoomServices = Room.roomServices | "";

                    //bedroom features
                    $scope.Room.BedroomFeatures = Room.bedroomFeatures || "";
                    $scope.Room.BedroomFacilities = Room.bedroomFacilities || "";
                    $scope.Room.BedroomProvisions = Room.bedroomProvisions || "";


                    //bathroom features
                    $scope.Room.BathroomFeatures = Room.bathroomFeatures || "";
                    $scope.Room.BathroomFittings = Room.bathroomFittings || "";
                    $scope.Room.BathroomProvisions = Room.bathroomProvisions || "";

                    $scope.Room.Images = Room.roomImages;
                    $scope.Room.HeroImages = [];
                    $scope.Room.NonHeroImages = [];

                    //sort images: hero and non hero images
                    var imagePathThumbs = 'http://www.didgigo.com/ProductImages//Thumbnails//';
                    var imagePathHiRes = 'http://www.didgigo.com/ProductImages//Uploaded//';

                    // use non hero images for room details page
                    $scope.detailSlides = [];
                    $scope.detailSlideCounter = 0;

                    //copy the slides array to slidescopy so it can be used after when we leave the room details image page
                    $scope.$parent.SlidesMainCopy = $scope.$parent.slides.slice();

                    //reset parent slides to 0
                    $scope.$parent.slides = [];
                    $scope.$parent.slideCurrIndex = 0;


                    for (var i = 0; i < $scope.Room.Images.length; i++) {
                        var img = $scope.Room.Images[i];
                        if (img) {

                            var imgName = imagePathThumbs + $scope.Room.Images[i].Product_Image.replace(".jpg", "_thumblowres.jpg").replace(".png", "_thumblowres.png").replace(/ /g, '%20');
                            var hiResImg = imagePathHiRes + $scope.Room.Images[i].Product_Image.replace(/ /g, '%20');
                            if (img.Hero_Image === "Y") {

                                $scope.$parent.slides.push({
                                    image: imgName,
                                    id: $scope.$parent.slideCurrIndex
                                });
                                $scope.$parent.slideCurrIndex += 1;
                            }

                            if (img.Hero_Image !== "Y") {
                                //console.log("not hero image");
                                //check if lowres image exists in server

                                $scope.detailSlides.push({
                                    image: imgName,
                                    id: $scope.detailSlideCounter
                                });
                                $scope.detailSlideCounter += 1;


                            }
                        } //end if img 
                    } //end for loop







                })
                .error(function (data, status, headers, config) {
                    
                    $scope.ShowError("Failed to Get Room Details"); 
                });

        } // end if

        $scope.ShowError = function (errorMessage) {
                var errHTML = document.getElementById("errorMessage");
                var errHolder = document.getElementById("errorContainer");
                if (errorMessage) {

                    errHTML.innerHTML = errorMessage;
                    errHolder.style.display = 'block';
                } else {
                    errHolder.style.display = 'none';
                }
        }

        $scope.getHiResImage = function (value) {
            var imagePathHiRes = 'http://www.didgigo.com/ProductImages//Uploaded//';
            var hiResImg = "";
            if (value) {
                hiResImg = imagePathHiRes + value.replace("_thumblowres.jpg", ".jpg").replace("_thumblowres.png", ".png");
            }

            return hiResImg || " ";
        }
        $scope.$on('heroSlidesBroadCastEvent', function (event, args) {
            $scope.message = args.message;
            $route.reload();
            //console.log("heroSlidesBroadCastEvent" + $scope.message);
        });


        $scope.$on("$destroy", function () {

            $scope.$parent.slides = $scope.$parent.SlidesMainCopy.slice();
            $scope.$parent.slideCurrIndex = $scope.$parent.slides.length;

        });
    }]);
 
}());