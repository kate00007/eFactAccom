
(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('FacilityDetailsViewController', ['$scope', '$http', '$routeParams', '$route', 'dataFactory', 'Utils', function ($scope, $http, $routeParams, $route, dataFactory, Utils) {
        var Facilities = {};
        $scope.Facilities = {};
        // use non hero images for room details page
        $scope.detailSlides = [];
        $scope.detailSlideCounter = 0;

        $scope.detailHiRes = [];

        //sort images: hero and non hero images
        var imagePathThumbs = 'http://www.didgigo.com/ProductImages//Thumbnails//';
        var imagePathHiRes = 'http://www.didgigo.com/ProductImages//Uploaded//';

        $scope.init = function () {
            //console.log("FacilityDetailsViewController");
            if ($routeParams.productOptionId) {
                //console.log("FacilityDetailsViewController " + $routeParams.productOptionId);
                //10351
                dataFactory.getFacilityDetails($routeParams.productOptionId)
                .success(function (data, status, headers, config) {
                    $scope.ShowError(""); 
                    Facilities = JSON.parse(data.d);
                    console.log("Facility " + JSON.stringify(Facilities));



                    //main info
                    $scope.Facilities.FacilityName = Facilities.FacilityName;
                    $scope.Facilities.ShortDescription = Facilities.shortDescription;
                    $scope.Facilities.LongDescription = Facilities.longDescription;
                    $scope.Facilities.Images = Facilities.Images;

                    $scope.Facilities.Access = Facilities.access;
                    $scope.Facilities.Awards = Facilities.awards;
                    $scope.Facilities.Beverage = Facilities.beverage;
                    $scope.Facilities.Cuisine = Facilities.Cuisine;
                    $scope.Facilities.Entertainment = Facilities.entertainment;
                    $scope.Facilities.OpeningHours = Facilities.openingHours;
                    $scope.Facilities.PrivateDining = Facilities.privateDining;
                    $scope.Facilities.Service = Facilities.service;
                    $scope.Facilities.Tastings = Facilities.tastings;



                    $scope.Facilities.HeroImages = [];
                    $scope.Facilities.NonHeroImages = [];

                    //console.log("Facility Images" + JSON.stringify(Facilities.Images));
                    $scope.Facilities.Details = "details";





                    //copy the slides array to slidescopy so it can be used after when we leave the room details image page
                    $scope.$parent.SlidesMainCopy = $scope.$parent.slides.slice();

                    //reset parent slides to 0
                    $scope.$parent.slides = [];
                    $scope.$parent.slideCurrIndex = 0;


                    $scope.detailSlides2 = $scope.Facilities.Images.map(function (imgObj) { return imgObj.Product_Image });


                    for (var i = 0; i < $scope.Facilities.Images.length; i++) {
                     
                        var img = $scope.Facilities.Images[i];
                        var imgName = imagePathThumbs + $scope.Facilities.Images[i].Product_Image.replace(".jpg", "_thumblowres.jpg").replace(".png", "_thumblowres.png").replace(/ /g, '%20');
                        var hiResImg = imagePathHiRes + $scope.Facilities.Images[i].Product_Image.replace(/ /g, '%20');
                     
                        if (img) {

                            //console.log("Image >>>" + JSON.stringify(img) + "imgName:" + imgName);
                            if (img.Hero_Image === "Y") {

                                $scope.$parent.slides.push({
                                    image: imgName,
                                    id: $scope.$parent.slideCurrIndex
                                });
                                $scope.$parent.slideCurrIndex += 1;


                            }

                            if (img.Hero_Image !== "Y") {
                                console.log("not hero image");

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

                    $scope.ShowError("Failed to Facilities Details"); 
                });

            } // end if
        } //end init

        $scope.init();

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

        $scope.getHiResImage = function (index) {
            return $scope.detailHiRes[index];
        }
    }]);
 
}());