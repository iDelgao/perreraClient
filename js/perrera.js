var endpoint = "http://localhost:8080/perreraWS/service/";
    var perros = []; //array con perros
    var perro_seleccionado;
    $list = $('#list_home');
$(function() {
    console.log( "ready!" );
    //llamada Ajax
    $.ajax(endpoint + "perro/", {
        "type": "get"
        , "encoding": "UTF-8"
        , "data": {
            // nombre: valor
        }
        , "success": function (result) {
            console.log("Llego el contenido y no hubo error", result);
            perros = [];
            if ( result == undefined ){
                $list.html('<li style="color:red;">No Existen perro todavia, por favor da de alta uno.</li>');
            }else{
                $.each(result, function(i,v){
                   perros.push(v);
                });
                console.debug('cargados %i perros', perros.length );
                refreshListView();
            }
        }
        , "error": function (result) {
            console.error("Este callback maneja los errores", result);
            $list.html('<li style="color:red;">Servidor parado, perdona las molestias.</li>');
        }
    });
});
function refreshListView(){
    $list.html('');
    console.log('limpiada lista');
    var li = '<li onClick="detalle_perro(#posicion#)">'+
                 '<a href="#">'+
                     '<img src="#perro.imagen#" class="ui-thumbnail ui-thumbnail-circular" />'+
                     '<h2>#perro.nombre#</h2>'+
                     '<p>#perro.raza#</p>'+
                 '</a>'+
             '</li>';
    var content = '';
    var item;
    $.each(perros, function(i,v){
        item = li;
        item = item.replace('#posicion#', i);
        item = item.replace('#perro.imagen#', v.imagen);
        item = item.replace('#perro.nombre#', v.nombre);
        item = item.replace('#perro.raza#', v.raza);
        content += item;
    });
    $list.html(content).listview('refresh');
    console.log('lista recargada');
}
function detalle_perro( posicion ){
    console.debug('pulsado %i elemento de la lista valor %o', posicion, perros[posicion]);
    perro_seleccionado = perros[posicion];
    // Dialog present in a multipage document
    $.mobile.changePage( "#page_detalle", { role: "dialog" } );
}
$(document).on("pagebeforeshow","#page_detalle",function(){
  console.log('pagebeforeshow:#page_detalle');
  //cargar datos del perro seleccionado
  $("#detalle_perro_titulo").text( perro_seleccionado.nombre );
  $("#detalle_perro_raza").text( perro_seleccionado.raza );
  $("#detalle_perro_imagen").attr('src', perro_seleccionado.imagen );
});
