'use strict';

/* Application */

var ExpenseModel = Parse.Object.extend("ExpenseModel");
Parse.initialize("44bUwMq0hA8XKmNA8XdwjPwhriW9eTiZaMrEou4O", "wP4MVVUYlSvAzcMdxDg0xBENG3E3CaoO7lChF1kU");

var wife = angular.module('Wife', [])
.controller('expenseController', function($scope, expenseService) {
    $scope.expenses = {
        list : [],
        _expense : { name : null, cost : null, description: null },  
        add_expense : function() {
            var new_expense = new ExpenseModel();
            new_expense.save($scope.expenses._expense, {
                success: function(expense) {
                    console.log('before', $scope.expenses.list.length, $scope.expenses.list);
                    $scope.expenses.list.push($scope.expenses._expense);
                    console.log('after', $scope.expenses.list.length, $scope.expenses.list);
                },
                error: function(expense, error) {
                    console.log('error', error, expense);
                }
            });
            $scope.expenses._expense = { name : null, cost : null, description: null };
        },
        total : function() {
            var total = 0;
            for(var item in $scope.expenses.list) {
                total += $scope.expenses.list[item].cost;
            }
            return total;
        }
    };
    expenseService.get_expenses().then(function(records) {
        records.forEach(function(record) {
            $scope.expenses.list.push({
                name : record.get('name'),
                description : record.get('description'),
                cost : record.get('cost'),
                date : record.createdAt
            });
        });
    });
})
.service('expenseService', function($http, $q) {
    this.get_expenses = function() {
        var d = $q.defer();
        var ExpenseModel = Parse.Object.extend("ExpenseModel");
        var query = new Parse.Query(ExpenseModel);
        query.find({
            success: function(records) {
                d.resolve(records);
            },
            error: function(object, error) {
                d.reject(error);
            }
        });
        return d.promise;
    };
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
