function cambiar_color(color){
    
    let imagen_auto = document.getElementById('auto');

    imagen_auto.src = color
};

document.getElementById('boton-blanco').addEventListener('click', function(){
    cambiar_color('Imagenes/auto_blanco.png')
});

document.getElementById('boton-rojo').addEventListener('click', function(){
    cambiar_color('Imagenes/auto_rojo.png')
});

document.getElementById('boton-negro').addEventListener('click', function(){
    cambiar_color('Imagenes/auto_negro.png')
});
