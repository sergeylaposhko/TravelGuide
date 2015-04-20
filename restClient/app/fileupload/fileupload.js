'use strict';

var app = angular.module('myApp.fileUpload', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/fileupload', {
        templateUrl: 'fileupload/fileupload.html',
        controller: 'FileUploadController'
    });
}]);

app.controller('FileUploadController', ['$scope', '$http', function ($scope, $http) {

    $scope.document = {};

    $scope.testData = 'testData';

    var file;

    $scope.setTitle = function (fileInput) {

        file = fileInput.value;
        var filename = file.replace(/^.*[\\\/]/, '');
        var title = filename.substr(0, filename.lastIndexOf('.'));
        $("#title").val(title);
        $("#title").focus();
        $scope.document.title = title;
    };

    $scope.uploadFile = function () {
        var formData = new FormData();

        formData.append('first', 'second');

        var fileInput = $('#fileinput');
        formData.append('file', fileInput.val()[0]);

        $http({
                method: 'POST',
                url: 'http://localhost:8080/test/sp/file/upload',
                headers: {
                    'Content-Type': 'multipart/mixed;boundary=gc0p4Jq0M2Yt08jU534c0p',
                    'Content-Length': '100'
                },
                data: formData,
                transformRequest: function (data) {
                    return data;
                }
            })
            .success(function (data, status) {
                alert("Success ... " + status);
            })
            .error(function (data, status) {
                alert("Error ... " + status);
            });
    }

    $scope.uploadFile1 = function () {
        var uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('test', 'test data');
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function () {})
                .error(function () {});
        }



        uploadFileToUrl($scope.myFile, 'http://localhost:8080/test/sp/file/upload');

    }
}]);




app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);