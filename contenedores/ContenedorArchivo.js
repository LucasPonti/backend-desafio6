const { promises: fs } = require('fs')

let array = [];

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        try {
            const producto =  this.listarAll();
            const productsById = producto.find(p => p.id == id);
            return productsById;  
         } catch (error) {
             console.log('Hubo un error en getById')
         }
    }

    async listarAll() {
        try {
            const productos = await fs.readFile('./' + this.ruta+'.txt', 'utf8')
            return JSON.parse(productos);
        } catch (error) {
            console.log('Hubo un error en listarAll');
        } 
    }

    async guardar(obj) {
        try {
            obj.id = array.length + 1;
            array = [array, obj];
            await fs.writeFile('./'+this.ruta+'.txt', JSON.stringify(array)+'\n');
        } catch (error) {
            console.log('Hubo un error en Guardar');
        }
    }

    async actualizar(elem, id) {
        try {
            prod.id = id;
            this.productos[id - 1] = prod; 
        } catch (error) {
           console.log(error) 
        }
    }

    async borrar(id) {
        try {
            const producto =  this.listarAll();
            const productsById = producto.filter(p => p.id != id); 
            await fs.writeFile('./'+this.ruta+'.txt' ,  JSON.stringify(productsById));
          } catch (error) {
             console.log('Hubo un error en deleteById'); 
          }
    }

    async borrarAll() {
        array = [];
        const productos = await fs.writeFile('./'+this.ruta+'.txt', JSON.stringify(array));
    }
}

module.exports = ContenedorArchivo