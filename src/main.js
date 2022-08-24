const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')

//--------------------------------------------
// instancio servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const prod = new ContenedorArchivo(); 
const mens = new ContenedorMemoria();


const messages = [
    {
        username: "Alejandro",
        message: "Hola!! que tal?"
    },
    {
        username: "Juan",
        message: "Hola!! Muy bien!"
    },
    {
        username: "Facundo",
        message: "Genial!!!"
    },
    {
        username: "Alejandro",
        message: "Hola!! que tal?"
    },
    {
        username: "Juan",
        message: "Hola!! Muy bien!"
    },
    {
        username: "Facundo",
        message: "Genial!!!"
    },
    {
        username: "Alejandro",
        message: "Hola!! que tal?"
    },
    {
        username: "Juan",
        message: "Hola!! Muy bien!"
    },
    {
        username: "Facundo",
        message: "Genial!!!"
    }
];

const productos = [{
    title: 'escuadra',
    price: 5000,
    thumbnail: 'www.askdjnbaskdebugger.com'
}
];

//--------------------------------------------
// configuro el socket
app.use(express.static('public'));

io.on('connection', async socket => {
   console.log('Nuevo cliente conectado'); 

   socket.emit('messages' , messages);
    console.log(messages);
    
   socket.on('new-message', mensajes => {
    horaActual = new Date().getHours();
    minActual = new Date().getMinutes();
    mensajes.hora = horaActual + ':' + minActual;
    messages.push(mensajes);
    io.sockets.emit('messages', messages);
   });

   //productos
//    const productos = await prod.listarAll()
   socket.emit('productos' , productos);
   console.log(productos);
   
   socket.on('new-producto',  producto => {
        //  productos.save(data);
        productos.push(producto)
        io.sockets.emit('productos', productos);
   });

});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))