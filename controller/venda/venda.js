BasisApp.controller('vendaControl', function ($scope, $http, conexao){
    //Global
    //Inicializando
    $scope.init = function(){
        conexao.getCarrinho(function(data){
            $scope.carrinho = data;
        });
        $scope.template = "view/template/venda/modalOpcaoProduto.html";
    }
    $scope.init();
    //Carregamento dos dados
    conexao.list(function(data){
        $scope.ingredientes = data;
        $scope.regra_ordem = "nome";
    });
    //Ordenação
    $scope.fncOrder = function(ordem){
        $scope.regra_ordem = ordem;
    };
    $scope.fncGetObjetoDOM = function(e){
        if($scope.produto==null){
            $scope.produto = $(e.target).data("objeto");
            $("#modal_opcao_produto").show("bounce");
        }else{
            alert("Você precisa definir o primeiro objeto!");
        }
    }
    $scope.fncCancelaAdcProduto = function(e){
         $(e.target).parent().hide();
         $scope.produto = null;
    }
    $scope.fncAdicionarCarrinho = function(e){
        $scope.produto.quantidade = $("#quantidade_produto").val();
        
        console.log($scope.produto);
        if($scope.produto.quantidade){
            $scope.carrinho.push($scope.produto);
            conexao.setCarrinho($scope.carrinho);
            $(e.target).parent().hide();
            $scope.produto = null;
        }else{
            alert("Digite quantidade");
        }
    }
    $scope.fncDelete = function(e){
        var objeto = $(e.target).data("objeto");
        conexao.delteFromCarrinho(objeto);
        $("#alerta_produto_removido").show("drop");
    }
    $scope.containsObject = function(obj) {
        var i;
        if($scope.carrinho!=null){
            for(i = 0; i < $scope.carrinho.length; i++) {
                if (angular.equals($scope.carrinho[i], obj)) {
                    return false;
                }
            }
        }

        return true;
    };
});