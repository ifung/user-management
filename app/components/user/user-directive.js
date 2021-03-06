angular.module('userMgmtApp.userDirective', [])
    .directive('stRatio', function () {
        'use strict';

        return {
            link: function (scope, element, attr) {
                var ratio =+ (attr.stRatio);

                element.css('width', ratio + '%');
            }
        };
    })
    .directive('backButton', function () {
        'use strict';

        return {
            restrict: 'E',
            template: '<button class="btn btn-default btn-sm">Back</button>',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    history.back();
                    scope.$apply();
                });
            }
        };
    })
    .directive('myTokens', function ($routeParams, uuid4, userFactory) {
        'use strict';

        return {
            restrict: 'E',
            controller: function ($scope) {
                var user = userFactory.getUser($routeParams.id);
                $scope.tokens = userFactory.getUser($routeParams.id).tokens;
                
                // Adds a random, unique token to the user
                $scope.addToken = function () {
                    var newValue = uuid4.generate(),
                        numToken;

                    numToken = user.tokens.length;
                    user.tokens[numToken] = newValue;
                    
                    // Save to local storage
                    userFactory.updateUser(user);

                    $scope.tokens = userFactory.getUser($routeParams.id).tokens;
                };

                // Deletes the token at that index
                $scope.deleteToken = function (index) {
                    $scope.tokens.splice(index, 1);
                    user.tokens = $scope.tokens;
                    
                    // Save to local storage
                    userFactory.updateUser(user);
                };
            },
            templateUrl: 'components/user/my-tokens.html'
        };
    });