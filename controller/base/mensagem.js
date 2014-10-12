
BasisApp.controller("chatController", ["$scope", "$firebase", "$compile",
  function($scope, $firebase, $compile) {
    var o_usuario = JSON.parse(sessionStorage.getItem('o_usuario'));
    if(o_usuario!=null){
    var conexaoFirebase = new Firebase("https://vendas.firebaseio.com/mensagens");
    
    $scope.mensagens = [];
    
    $scope.chatSession = [1,2,3,4];
        for(var i = $scope.chatSession.length - 1; i >= 0; i--) {
        if($scope.chatSession[i] === o_usuario.id) {
           $scope.chatSession.splice(i, 1);
        }
    }
    conexaoFirebase.on('child_added', function(snap){
        var mensagem = snap.val();
        if(mensagem.para==o_usuario.id){
            $scope.mensagens.push(mensagem);
        }else if(mensagem.de==o_usuario.id){
            $scope.mensagens.push(mensagem);
        }
    });
     //create an AngularFire reference to the data
     var sync = $firebase(conexaoFirebase);
     //download the data into a local object
     $scope.data = sync.$asArray();
    
    var last = conexaoFirebase.limit(1);
    
    last.on('child_added', function(snap){
        $scope.lastMessage = snap.val();
    })
    }
    $scope.functionAlert = function(e){
        var loja = $(e.target).data("loja");
        var html = '<div class="mensagem">\n\
<div class="mensagem-header"><h5>Loja '+loja+'</h5><span class="fechar-mensagem" ng-click="functionFecharMensagem($event)">&times</span></div>\n\
<div class="mensagem-body"><div id="receive-mensagens" class="receive-mensagens">\n\
<li ng-repeat="mensagem in mensagens">\n\
<span style="col-md-2">\n\
    {{ mensagem.de == '+o_usuario.id+' && mensagem.para == '+loja+' ? mensagem.texto : nothing }}<br />\n\
</span>\n\
<span style="col-md-2">\n\
 {{ mensagem.de == '+loja+' && mensagem.para == '+o_usuario.id+' ? mensagem.texto : nothing }}<br />\n\
</span>\n\
</li>\n\
</div>\n\
<input ng-model="texto_mensagem"  type="text">\n\
<button ng-click="functionSend($event)" data-loja="'+loja+'">Enviar</button></div></div>';
        $(".conteiner-mensagens").append($compile(html)($scope));
    };
    $scope.functionFecharMensagem = function(e){
        $(e.target).parent().parent().hide();
    }
    $scope.functionSend = function(e){
        var destinatario = $(e.target).data('loja');
        $scope.data.$add({de:o_usuario.id, para:destinatario, texto: +o_usuario.nome+" disse : "+$scope.texto_mensagem});
        $scope.texto_mensagem = "";
        var objDiv = document.getElementById("receive-mensagens");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
  }
]);