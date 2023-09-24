const socket = io();


socket.on("connect", ()=>{

   socket.emit("solicitarProductos");
  
})

socket.on("mostrarProductos", (productos)=>{
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
})

socket.on("post", (productos)=>{
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
})