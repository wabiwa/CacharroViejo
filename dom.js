function cambiar_color(color){
    
    let imagen_auto = document.getElementById('auto');

    if (imagen_auto) {
        imagen_auto.src = color;
    }


    localStorage.setItem('color_auto', color)
    localStorage.setItem('color_auto_2', '../' + color)
};

const botones_color = ['boton-blanco','boton-rojo','boton-negro'];
const clases_cambio = ['cambio-blanco', 'cambio-rojo', 'cambio-negro'];

function marcar_boton_seleccionado_color(id_seleccionado,clase_aplicar){
    botones_color.forEach(id =>{
        const boton = document.getElementById(id);
        if(boton){
            clases_cambio.forEach(clase => boton.classList.remove(clase));
            if(id === id_seleccionado){
                boton.classList.add(clase_aplicar);
            }
        }
    });
}

const botones_adicionales = ['neblinero', 'portaequipaje', 'cinturones', 'luces', 'camara'];

function activar_boton_adicional(id_boton) {
    const boton = document.getElementById(id_boton);
    if (boton) {
        boton.classList.add('cambio-success');
    }
}

function resetear_botones_adicionales() {
    botones_adicionales.forEach(id => {
        const boton = document.getElementById(id);
        if (boton) {
            boton.classList.remove('cambio-success');
        }
    });
}

var valor_color = 0;
var valor_agregado = 0;
var agregados = [];
let color = "";

if (document.getElementById('auto')) {

    let boton_color = false


    document.getElementById('boton-blanco').addEventListener('click', function(){
        cambiar_color('Imagenes/auto_blanco.png');
        valor_color = 0;
        color = "Blanco";
        boton_color = true;
        marcar_boton_seleccionado_color('boton-blanco','cambio-blanco');
    });

    document.getElementById('boton-rojo').addEventListener('click', function(){
        cambiar_color('Imagenes/auto_rojo.png');
        valor_color = 400000;
        color = "Rojo";
        boton_color = true;
        marcar_boton_seleccionado_color('boton-rojo','cambio-rojo');
    });

    document.getElementById('boton-negro').addEventListener('click', function(){
        cambiar_color('Imagenes/auto_negro.png');
        valor_color = 800000;
        color = "Negro";
        boton_color = true;
        marcar_boton_seleccionado_color('boton-negro','cambio-negro');
    });

    window.addEventListener('load', () => {
        let color_guardado = localStorage.getItem('color_auto');
        if(color_guardado){
            cambiar_color(color_guardado);
        }
    });

    document.getElementById('neblinero').addEventListener('click',function(){
        let item = "Neblineros: $80.000"
        if (!agregados.includes(item)) {
            valor_agregado += 80000;
            agregados.push(item);
            activar_boton_adicional('neblinero');
        }
    });
    
    document.getElementById('portaequipaje').addEventListener('click',function(){
        let item = "Portaequipaje: $350.000"
        if (!agregados.includes(item)) {
            valor_agregado += 350000;
            agregados.push(item);
            activar_boton_adicional('portaequipaje');
        }
    });

    document.getElementById('cinturones').addEventListener('click',function(){
        let item = "Cinturones y Arnes: $50.000"
        if (!agregados.includes(item)) {
            valor_agregado += 50000;
            agregados.push(item);
            activar_boton_adicional('cinturones');
        }
    });

    document.getElementById('luces').addEventListener('click',function(){
        let item = "Luces led: $70.000"
        if (!agregados.includes(item)) {
            valor_agregado += 70000;
            agregados.push(item);
            activar_boton_adicional('luces');
        }
    });

    document.getElementById('camara').addEventListener('click',function(){
        let item = "Cámara trasera: $100.000"
        if (!agregados.includes(item)) {
            valor_agregado += 100000;
            agregados.push(item);
            activar_boton_adicional('camara');
        }
    });
    
    document.getElementById('reset').addEventListener('click',function(){
        valor_agregado = 0;
        agregados = [];
        resetear_botones_adicionales();
    });

    document.getElementById('comprar').addEventListener('click', function(event){
        event.preventDefault();

        if (boton_color === true){
            localStorage.setItem('color_auto_nombre', color);
            localStorage.setItem('valor_color', valor_color);
            localStorage.setItem('valor_agregado', valor_agregado);
            localStorage.setItem('agregados', JSON.stringify(agregados));
            window.location.href = 'paginas/resumen_venta.html';
        }else{
            alert('Por favor, selecciona un color antes de comprar.')
        }
    });


}

if(window.location.pathname.includes("resumen_venta.html")){
    const limpiar_datos = () => {
        localStorage.removeItem('color_auto_nombre');
        localStorage.removeItem('valor_color');
        localStorage.removeItem('valor_agregado');
        localStorage.removeItem('agregados');
        localStorage.removeItem('valor_final');
    };

    const boton = document.getElementById('Inicio');
    if (boton) {
        boton.addEventListener('click',limpiar_datos)
    }
}

window.addEventListener('load', () => {
    const img = document.getElementById('auto_2');
    const color_guardado = localStorage.getItem('color_auto_2');
    if (img && color_guardado) {
        img.src = color_guardado;
    }

    const lista = document.getElementById('lista-auto');
    if (lista) {
        lista.innerHTML = '';
    }

    const agregados = JSON.parse(localStorage.getItem('agregados')) || [];
    const color = localStorage.getItem('color_auto_nombre');

    if (color) {
        const liColor = document.createElement('li');
        liColor.className = 'list-group-item';
        liColor.textContent = `Color: ${color}`;
        if (lista){
            lista.appendChild(liColor);
        }
    }

    agregados.forEach(function(item){
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = item;
        if (lista){
            lista.appendChild(li);
        }

    });

    const valor_base = 3500000;
    const valor_color = parseInt(localStorage.getItem('valor_color')) || 0;
    const valor_agregado = parseInt(localStorage.getItem('valor_agregado')) || 0;
    const precio_final = valor_base + valor_color + valor_agregado;

    const precioElemento = document.querySelector('.precio');
    if (precioElemento) {
        precioElemento.textContent = `Precio final: $${precio_final.toLocaleString('es-CL')}`;
    }

});