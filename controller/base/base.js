
var BasisApp = angular.module('BasisApp', ['ngRoute',"firebase"]);

BasisApp.config(['$routeProvider', function($routeProvider){
        $routeProvider.when("/", {
            templateUrl: 'view/template/comum/inicio.html',
            controller: 'usuarioControl'
        }).when('/pesquisaProduto',{
            templateUrl: 'view/template/venda/tabelaProdutos.html',
            controller: 'vendaControl'
        }).when('/venda',{
            templateUrl: 'view/template/venda/venda.html',
            controller: 'vendaControl'
        }).when('/produtos',{
            templateUrl: 'view/template/produto/list_produto.html',
            controller: 'produtoControl'
        }).when('/produtos/novo',{
            templateUrl: 'view/template/produto/form_produto.html',
            controller: 'produtoControl'
        }).when('/produtos/:produto_id',{
            templateUrl: 'view/template/produto/form_produto.html',
            controller: 'produtoControl'
        }).otherwise({
            redirectTo: '/'
        })
}]);
BasisApp.factory('conexao', function($http){
//    var cacheData;
//    var carrinho;
//    function getData(callback){
//        if(cacheData){
//            callback(cacheData);
//        }else{
//             $http.get('http://localhost:8080/ReceitaSimples/?controle=Ingrediente&acao=getIngredientes').success(function(data){
//                 cacheData = data;
//                 callback(cacheData);
//             });
//        }
//    }
//    return{
//        list: getData,
//        find: function(objeto, callback){
//               retorno = data.filter(function(objeto){
//               return entry.estado_id === name;
//               })[0];
//               callback(tipo)
//        },
//        getCarrinho: function(callback){
//            if(carrinho){
//                callback(carrinho);
//            }else{
//                 carrinho = JSON.parse(localStorage.getItem("carrinho"));
//                 if(!carrinho){
//                     carrinho = [];
//                     callback(carrinho);
//                 }
//            }
//        },
//        setCarrinho: function(array){
//            if(array){
//                localStorage['carrinho'] = JSON.stringify(array);
//                console.log(carrinho);
//            }
//        },
//        delteFromCarrinho: function(objeto, callback){
//            if(carrinho){
//               for(var i = carrinho.length - 1; i >=0; i--){
//                   if(carrinho[i].ingrediente_id===objeto.ingrediente_id){
//                       carrinho.splice(i,1);
//                   }
//               }
//               localStorage['carrinho'] = JSON.stringify(carrinho);
//            }
//        }
//    };
});
