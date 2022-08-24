const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    //Armar objeto producto y emitir mensaje a evento update
    const producto = {
        title: e.target[0].value,
        price: e.target[1].value,
        thumbnail: e.target[2].value
    };

    socket.emit('new-producto', producto);
   
})

socket.on('productos', async (productos) => {
    //generar el html y colocarlo en el tag productos llamando al funcion makeHtmlTable
    const html = await makeHtmlTable(productos);
    document.getElementById('productos').innerHTML = html;
    socket.emit('notificacion', 'Producto recibido')
});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
    const mensaje = {
        username: inputUsername.value,
        message: inputMensaje.value
    };

    socket.emit('new-message', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
    
})

socket.on('messages', data => {
    console.log(data);
    
    const mensajesHTML = data.map(msj => {
        return `<strong style="color: brown">${msj.hora}</strong>   ->   <strong style="color: blue">${msj.username}</strong>: <i style="color: green">${msj.message}</i><br>`;
    }).join('');
    
    document.getElementById('messages').innerHTML = mensajesHTML;
    
})


inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})