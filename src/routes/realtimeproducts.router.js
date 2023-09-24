const socket = io()

socket.on("productosActualizados", (productos) => {
    // Limpiar el renderizado actual
    const productosContainer = document.getElementById("productos-container");
    productosContainer.innerHTML = ""; 
  
    // Construye el HTML con los datos de productos actualizados.
    productos.forEach((producto) => {
      const productoElement = document.createElement("div");
      productoElement.innerHTML = `
        <p>${producto.title}</p>
        <p>${producto.price}</p>
      `;
      productosContainer.appendChild(productoElement);
    });
  });





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