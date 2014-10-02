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
        },
        totals : {
            cost : 0,
            items : 0
        }
    };
    $scope.$watch('expenses.list', function(o,n) {
        var total_cost = 0;
        for(var item in $scope.expenses.list) {
            total_cost += $scope.expenses.list[item].cost;
        }
        $scope.expenses.totals.cost = total_cost
        $scope.expenses.totals.items = $scope.expenses.list.length;
    });
    expenseService.load_expenses().then(function (data) {
        $scope.expenses.list = data.items;
    });
})
.service('expenseService', function($http) {
    this.load_expenses = function() {
        return $http.get('/dummy.json')
            .then(function(response) {
                return response.data;
            });
    }
});
