
(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('DetailsListController', ['$scope', '$http', '$routeParams', '$route', 'dataFactory', 'Utils', function ($scope, $http, $routeParams, $route, dataFactory, Utils) {

        $scope.Room = {};


        $scope.isDefined = function (value) {
            return value || false;
        }

        $scope.getText = function (value) {
            //console.log("GetText " + value);
            var Room = {};

            dataFactory.getRoomDetails(value)
                .success(function (data, status, headers, config) {

                    Room = JSON.parse(data.d);
                    //main info
                    console.log("JSON GetText " + JSON.stringify(Room));


                    $scope.Room.NumberOfRooms = Room.Number_of_Rooms;
                    $scope.Room.RoomSize = Room.Room_Size;
                    $scope.Room.Classification = Room.Classification;
                    $scope.Room.ShortDescription = Room.shortDescription;
                })
                .error(function (data, status, headers, config) {
                    console.log("----Failed Get Room Details" + status);

                });

        }



    } ]);


} ());

