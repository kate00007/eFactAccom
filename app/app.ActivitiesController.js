
(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('ActivitiesController', ['$scope', '$http', '$routeParams', '$route', 'dataFactory', 'Utils', function ($scope, $http, $routeParams, $route, dataFactory, Utils) {
        $scope.init = function () {
            dataFactory
                .getFacts()
                .success(function (data, status, headers, config) {
                    $scope.ShowError("");
                    console.log("getFacts: " + JSON.parse(data.d));
                    var activityFacts = JSON.parse(data.d);
                    console.log("ActivityList " + JSON.stringify(activityFacts));

                })
                .error(function (data, status, headers, config) {
                    console.log("----Failed Get Room Details" + status);
                    $scope.ShowError("Failed to Activities Details");
                });
        }

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

    } ]);

} ());
