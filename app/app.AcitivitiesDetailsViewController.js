
(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('ActivityDetailsViewController', ['$scope', '$http', '$routeParams', '$route', 'dataFactory', 'Utils', function ($scope, $http, $routeParams, $route, dataFactory, Utils) {
          
        var Activity = {};
            $scope.Activity = {};
            console.log("ActivityDetailsViewController");
            if ($routeParams.productOptionId) {
                console.log("ActivityDetailsViewController " + $routeParams.productOptionId);
                //10351
                dataFactory.getActivityDetails($routeParams.productOptionId)
                .success(function (data, status, headers, config) {
                    $scope.ShowError(""); 
                    Activity = JSON.parse(data.d);

                    console.log("Activity " + JSON.stringify(Activity));
                    //main info
                    $scope.Activity.ActivityName = Activity.ActivityName;
                    $scope.Activity.ShortDescription = Activity.shortDescription;
                    $scope.Activity.LongDescription = Activity.longDescription;
                    $scope.Activity.Images = Activity.Images;
                    $scope.Activity.HeroImages = [];
                    $scope.Activity.NonHeroImages = [];

                    console.log("Activity Images" + JSON.stringify(Activity.Images));
                    $scope.Activity.Details = "details";

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

                    console.log(">>Activities Images: " + JSON.stringify($scope.Activity.Images));
                    for (var i = 0; i < $scope.Activity.Images.length; i++) {
                        var img = $scope.Activity.Images[i];
                        var imgName = imagePathThumbs + $scope.Activity.Images[i].Product_Image.replace(".jpg", "_thumblowres.jpg").replace(".png", "_thumblowres.png").replace(/ /g, '%20');
                        var hiResImg = imagePathHiRes + $scope.Activity.Images[i].Product_Image.replace(/ /g, '%20');

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

                    console.log(">>> scope.detailSlides" + JSON.stringify($scope.detailSlides));


                })
                .error(function (data, status, headers, config) {
                    console.log("----Failed Get Room Details" + status);
                    $scope.ShowError("Failed to Activities Details"); 
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

            $scope.getHiResImage = function(index)
            {
                return $scope.detailHiRes[index];
            }


    }]);

}());
