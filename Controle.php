<?php

class Controle {
    
    public function printPost(){
            echo '<html>';
            echo '<head>';
            echo '<title>Debug - Saída $_POST</title>';
            echo '</head>';
            echo '<body>';
            echo '<table border="1px">';
            echo '<th>Name</th>';
            echo '<th>Input_Value</th>';
        foreach ($_POST as $key => $value) {
                        echo "<tr><td> ";
                        echo $key;
                        echo "</td><td>";
                        echo $value;
                        echo "</td></tr>";
                     }
                foreach($_FILES as $key => $value){
                        echo "<tr><td> ";
                        echo $key;
                        echo "</td><td>";
                        echo $value['name'];
                        echo ' / '.$value['size'];
                        echo ' / '.$value['type'];
                        echo "</td></tr>";
                }
            echo '</table>';
            echo '</body>';
            echo '</html>';
    }
    public function setSessao(){
        if((isset($_COOKIE['receitasup']))){
                $o_usuario = new Object_Usuario();
                $cookie = base64_decode($_COOKIE['receitasup']);
                $cookie = explode("-", $cookie);
                $o_usuario->setUsuario_id($cookie[0]);
                $Model_usuario = new Model_Usuario();
                $o_usuario = $Model_usuario->getUsuario($o_usuario);
                $_SESSION['o_user'] = serialize($o_usuario);
            }else if(isset($_SESSION['o_user'])){
                
            }
            else{
                $_SESSION['o_user'] = null;
            }
            $detect = new Mobile_Detect();
            if(($detect->isMobile())&&(!$detect->isTablet())){
                $versao = "mobile";
            }else if($detect->isTablet()){
                $versao = "tablet";
            }
            else{
                $versao = "pc";
            }
            $_SESSION['versao'] = $versao;
            
    }
    public function validaInput($variavel){
        $variavel = str_ireplace("--", "", $variavel);
        $variavel = str_ireplace("''", "", $variavel);
        $variavel = str_ireplace("'", "", $variavel);
        $variavel = str_ireplace("%", "", $variavel);
        $variavel = str_ireplace("  ", " ", $variavel);
        $variavel = str_ireplace("!", "", $variavel);
        $variavel = str_ireplace("\\", "", $variavel);
        $variavel = str_ireplace("//", "", $variavel);
        $variavel = str_ireplace(";", "", $variavel);
        $variavel = str_ireplace("]", "", $variavel);
        $variavel = str_ireplace("DROP", "", $variavel);
        $variavel = str_ireplace("DATABASE", "", $variavel);
        $variavel = str_ireplace("$", "", $variavel);
        $variavel = str_ireplace("&", "", $variavel);
        $variavel = str_ireplace("FROM", "", $variavel);
        $variavel = str_ireplace("*", "", $variavel);
        $variavel = str_ireplace("TABLE", "", $variavel);
        $variavel = str_ireplace("UPDATE", "", $variavel);
        $variavel = str_ireplace("INSERT", "", $variavel);
        $variavel = str_ireplace("SELECT", "", $variavel);
        $variavel = str_ireplace("DELETE", "", $variavel);
        $variavel = str_ireplace("db_biblioteca", "", $variavel);
        $variavel = str_ireplace("DB_BIBLIOTECA", "", $variavel);
        $variavel = mysql_real_escape_string($variavel);
        $final = utf8_decode($variavel);
        return $final;
    }
    public function index(){
        
    }
    public function message($titlo, $mensagem, $tipo, $botao){
        if($tipo==null){
            $tipo= "warning";
        }
        echo '<div class="alert alert-'.$tipo.' show box_alerta movel ui-draggable">
         <button type="button" class="close" data-dismiss="alert"></button>
         <h4 class="alert-heading">'.$titlo.'</h4>
         <p>';
        echo utf8_encode($mensagem);
        echo '</p>';
        if($botao!=null){
         echo '<p>'.$botao.'</p>';
          }
          echo '</div>';
    }
    public function printObject($Object){
        echo '<pre>';
        print_r($Object);
        echo  '</pre>';
    }
    public function record($id_op, $object){
        $obs = $object->getNome();
        $o_usuario = unserialize($_SESSION['o_user']);
        
        date_default_timezone_set('Brazil/East');
        $date = date('d/m/Y h:i:s a', time());
        
        $data = 'O administrador : '.$o_usuario->getNome().' ('.$o_usuario->getUsuario_id().') - '.$id_op.' '.$obs.' - '.$date.'%<br />%';
        
        file_put_contents("admin/lib/historico.txt", $data, FILE_APPEND);
    }
    public function redirect($url){
        header("LOCATION: ".$url);
    }
    
}
?>
