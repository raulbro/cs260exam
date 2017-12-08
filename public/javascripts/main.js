 angular.module('app', [])
  .controller('mainCtrl', [
    '$scope', '$http',
    function($scope, $http){

      $scope.test = 'Hello world!';
      $scope.products = [];

      $scope.addProduct = function(product) {
      	alert("asdasd")
            $scope.create({
            	name: product.name,
            	url: product.url,
            	price: product.price
            });
            product.name = '';
            product.url = '';
            product.price = '';
      };

      $scope.getAll = function() {
        return $http.get('/products').success(function(data){
          angular.copy(data, $scope.products);
        });
      };
      $scope.getAll();

      $scope.create = function(products) {
        return $http.post('/products', products).success(function(data){
          $scope.products.push(data);
        });
      };

    }

  ]);









