'use strict';

/* Application */

var wife = angular.module('Wife', [])
.controller('expenseController', function($scope, expenseService) {
    $scope.expenses = {
        list : [],
        new_expense : { name : null, cost : null, description: null },  
        add_expense : function() {
            $scope.expenses.new_expense.date = new Date();
            $scope.expenses.list.push($scope.expenses.new_expense);
            $scope.expenses.new_expense = { name : null, cost : null, description: null };
        }
    };

    $scope.total = function() {
        var total = 0;
        for(var item in $scope.expenses.list) {
            total += $scope.expenses.list[item].cost;
        }
        return total;
    }

    expenseService.load_expenses().then(function (data) {
        data.items.forEach(function(item) {
            $scope.expenses.list.push(item);
        });
    });

})
.service('expenseService', function($http) {
    this.load_expenses = function() {
        return $http.get('/dummy.json')
            .then(function(response) {
                return response.data;
            });
    }
})
.directive('expenseItem', function() {
    return {
        restrict: 'A',
        templateUrl: 'expense-item.html',
        scope : {
            'expense' : '=' 
        }
    }
});
