// const socket = io()





leerProducto()






//LEER PRODUCTOS EN PRODUCTOS.JSON
function leerProducto() {
    try {
       const filePath = path.join(__dirname, '../../productos.json');
       products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
       return products;
    } catch (error) {
       console.error('Error de lectura:', error);
    }
}