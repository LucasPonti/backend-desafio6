class ContenedorMemoria {
    constructor() {
        this.elementos = []
        this.id = 1
    }

    listar(id) {
        try {
            const producto =  this.getAll();
            const productsById = producto.find(p => p.id == id);
            return productsById;  
         } catch (error) {
             console.log('Hubo un error en getById')
         }
    }

    listarAll() {
        try {
            console.log(JSON.stringify(this.productos));
            return JSON.parse(JSON.stringify(this.productos));
        } catch (error) {
            console.log('Hubo un error en GetAll');
        }
    }

    guardar(elem) {
        try {
            obj.id = this.id;
            this.productos = [...this.productos, obj];
            this.id ++;
        } catch (error) {
            console.log('Hubo un error en Save');
        }
    }

    actualizar(elem, id) {
        try {
            prod.id = id;
            this.productos[id - 1] = prod; 
        } catch (error) {
           console.log(error) 
        } 
    }

    borrar(id) {
        try {
            const producto =  this.getAll();
            const productsById = producto.filter(p => p.id != id); 
            this.productos = productsById;
          } catch (error) {
             console.log('Hubo un error en deleteById'); 
          }  
    }

    borrarAll() {
        this.elementos = []
        this.id = 1
    }
}

module.exports = ContenedorMemoria