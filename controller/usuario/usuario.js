BasisApp.controller('usuarioControl',function ($scope, $http, conexao, $rootScope){
        $scope.funcaoSetUser = function(id){
            var usuario = {};
            if(id==1){
                 usuario = {id:1, nome:"Loja 1"};
            }
            else if(id==2){
                 usuario = {id:2, nome:"Loja 2"};
            }
            else if(id==3){
                 usuario = {id:3, nome:"Loja 3"};
            }
            else if(id==4){
                 usuario = {id:4, nome:"Loja 4"};
            }
            $rootScope.o_usuario = usuario;
            sessionStorage.setItem('o_usuario', JSON.stringify(usuario));
             window.location = "#/produtos";
        }
});