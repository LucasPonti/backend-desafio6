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

//--------------------------------------------
// configuro el socket
app.use(express.static('public'));

io.on('connection', async  socket => {
   console.log('Nuevo cliente conectado'); 
    const productos = await prod.getAll();
    const messages = mens.getAll();

   socket.emit('messages' , messages);
    console.log(messages);
    
   socket.on('new-message', mensajes => {
    horaActual = new Date().getHours();
    minActual = new Date().getMinutes();
    mensajes.hora = horaActual + ':' + minActual;
    const algo = [];
    algo.push(mensajes);
    mens.save(mensajes);
    io.sockets.emit('messages', messages);
    
    
   });

   //productos
   socket.emit('productos' , productos);
   console.log(productos);
   
   socket.on('new-producto', async producto => {
        // productos.push(producto);
        await prod.save(producto)
        await prod.getAll();
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