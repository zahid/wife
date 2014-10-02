'use strict';

/* Application */

var wife = angular.module('Wife', [])
    .controller('expenseController', function($scope, expenseService) {
        $scope.expenses = {
            list : [],
            new_expense : { name : null, cost : null, description: null },  
            add_expense : function() {
                if($scope.expenses.new_expense.name && $scope.expenses.new_expense.cost) {
                    $scope.expenses.new_expense.date = new Date();
                    $scope.expenses.list.push($scope.expenses.new_expense);
                    $scope.expenses.new_expense = { name : null, cost : null, description: null };
                }
            }
        };
        expenseService.getExpenses().then(function (data) {
            console.log('got expenses', data);
            $scope.expenses.list = data.items;
        });
    })
    .service('expenseService', function($http) {
        this.getExpenses = function() {
            return $http.get('/dummy.json')
                .then(function(response) {
                    return response.data;
                });
        }
    });

