    BasisApp.factory('conexao', function($http){
    var cacheData;
    function getData(callback){
        if(cacheData){
            callback(cacheData);
        }else{
             $http.get('http://localhost:8080/basis-end/?controle=produto&acao=getProdutos').success(function(data){
                 cacheData = data;
                 callback(cacheData);
             });
        }
    }return{
        list: getData,
        find: function(produto_id, callback){
            getData(function(data){
                var produto = data.filter(function(produtos){
                    return produtos.produto_id === produto_id;
                })[0];
                callback(produto);
            });
        },
    }
});

BasisApp.controller('produtoControl', function ($scope, $routeParams, $http, conexao){
    //Global
    //Inicializando
    $scope.init = function(){
            conexao.list(function(data){
               $scope.produtos = data; 
            });
            if(jQuery.isEmptyObject($routeParams)){
                $scope.modulo = {'tipo':"Novo"};
            }else{
               $scope.modulo = {'tipo':"Editar"};
               conexao.find($routeParams.produto_id, function(data){
               $scope.p = data;
            });
            }
    }
    $scope.init();
    //Ordenação
    $scope.fncOrder = function(ordem){
        $scope.regra_ordem = ordem;
    };
    $scope.fncInsere = function(e){
        if($scope.modulo.tipo=="Novo"){
            $.ajax({
                    type : 'POST',
                    url : 'http://localhost:8080/basis-end/?controle=produto&acao=insere',
                    data: ({nome_produto : $scope.p.nome_produto, codigo_original : $scope.p.codigo_original, codigo_fabricante : $scope.p.codigo_fabricante, 
            localizacao : $scope.p.localizacao, unidade : $scope.p.unidade, custo : $scope.p.custo, margem : $scope.p.margem, preco_final : $scope.p.preco_final}),
                    success : function (data) {
                        if(data=="true"){
                            $scope.$apply(function() { window.location = "#/produtos" });
                        }else{
                            (console).log(data);
                            obj = JSON.parse(data);
                            console.log(obj);
                            alert(obj.detalhe);
                        }
                    }
                });
        }else if($scope.modulo.tipo=="Editar"){
            $.ajax({
                    type : 'POST',
                    url : 'http://localhost:8080/basis-end/?controle=produto&acao=altera',
                    data: ({nome_produto : $scope.p.nome_produto, codigo_original : $scope.p.codigo_original, codigo_fabricante : $scope.p.codigo_fabricante, 
            localizacao : $scope.p.localizacao, unidade : $scope.p.unidade, custo : $scope.p.custo, margem : $scope.p.margem, preco_final : $scope.p.preco_final, 
            produto_id : $scope.p.produto_id}),
                    success : function (data) {
                        if(data=="true"){
                            $scope.$apply(function() { window.location = "#/produtos" });
                        }else{
                            (console).log(data);
                            obj = JSON.parse(data);
                            console.log(obj);
                            alert(obj.detalhe);
                        }
                    }
                });
        }
    };
    $scope.fncDelete = function(e){
        $("#alerta_produto_removido").show("blink");
        var produto_id = $(e.target).data("produto_id");
        if(produto_id!=null){
            $.ajax({
                    type : 'POST',
                    url : 'http://localhost:8080/basis-end/?controle=produto&acao=deleta',
                    data: ({produto_id : produto_id}),
                    success : function (data) {
                        if(data=="true"){
                            $scope.$apply(function() { window.location = "#/produtos" });
                        }else{
                            (console).log(data);
                            obj = JSON.parse(data);
                            console.log(obj);
                            alert(obj.detalhe);
                        }
                    }
                });
        }
    }
    $scope.calculaPrecoFinal = function(){
        if(($scope.p.custo!=null)&&($scope.p.margem!=null)){
            var custo = $scope.p.custo.replace(/,/g, '.');
            custo =  parseFloat(custo);
            var margem = parseFloat($scope.p.margem/100);
            $scope.p.preco_final = parseFloat(custo+(custo*margem));
        }
    }
});