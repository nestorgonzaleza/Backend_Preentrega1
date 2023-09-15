const fs = require('fs');

class ProductManager {
    
    constructor() {
        this.products = [];
    }

    getProducts() {

        this.leerPackageJson()

        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock, productStatus=true, category) {
       
        if (title === '' || description === '' || isNaN(price) || thumbnail === '' || isNaN(code) || isNaN(stock) || category === '') {
            console.log('Los valores ingresados son inválidos');
            return;
        }

        price = price;

        const product_id = this.products.length + 1;

        const product = {
            id: product_id,
            title,
            description,
            code,
            price,
            productStatus,
            stock,
            category,
            thumbnail
            
            
        };

        if (this.products.some((prod) => prod.code === product.code)) {
            console.log('Este producto ya existe en el catálogo');
            return;
        }

        this.products.push(product);
        this.guardarJson();
    }

    getProductById(product_id) {

        this.leerPackageJson()

        const producto_encontrado = this.products.find((prod) => prod.id === product_id);

        if (producto_encontrado) {
            console.log(producto_encontrado);
        } else {
            console.log('Not Found');
        }
    }

    deleteProductById(product_id) {
        const index = this.products.findIndex((prod) => prod.id === product_id);

        if (index !== -1) {
            this.products.splice(index, 1);
            this.guardarJson(); 
            console.log('Producto eliminado correctamente');
        } else {
            console.log('Producto no encontrado');
        }
    }

    updateProduct(product_id,title, description, price, thumbnail, code, stock){

        this.leerPackageJson()

        const producto_encontrado = this.products.find((prod) => prod.id === product_id);

        if (producto_encontrado) {

            producto_encontrado.title=title
            producto_encontrado.description=description
            producto_encontrado.price=price
            producto_encontrado.thumbnail=thumbnail
            producto_encontrado.code=code
            producto_encontrado.stock=stock



            console.log(producto_encontrado);
        } else {
            console.log('Not Found');
        }
    }

    guardarJson() {
        try {
            fs.writeFileSync('data.json', JSON.stringify(this.products));
            console.log('Archivo creado correctamente');
        } catch (error) {
            console.error('Error al crear el archivo');
        }
    }

    leerPackageJson=()=>{

        try{
        
        this.products = JSON.parse(fs.readFileSync("data.json","utf-8"))
        
        return this.products
        
        }catch(error){
        
        console.error("Error de lectura")
        
        }
        
        }
}


// test

const productManager = new ProductManager();

productManager.addProduct('Aros A', 'Aros bellos', 1000, 'ruta Aros', 1, 10);
productManager.addProduct('Anillos', 'Anillos bellos', 2000, 'ruta Anillos', 2, 5);
productManager.addProduct('Collar', 'Collar bonito', 4000, 'ruta Collar', 3,6);
productManager.addProduct('Pulsera', 'Pulsera bonita', 3000, 'ruta Pulsera', 4,10);

const productosActualizados = productManager.getProducts();
console.log('Productos actualizados', productosActualizados);

productManager.getProductById(1)

//updateProduct(product_id,title, description, price, thumbnail, code, stock)
productManager.updateProduct(2,"Actualizado", "Actualizacion del producto", 500, "ruta act", 500, 500)