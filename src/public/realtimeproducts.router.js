const socket = io();


socket.on("connect", ()=>{
   socket.emit("message","Al parecer se está entendiendo esto")
   socket.emit("solicitarProductos");
   // productos = products
   // socket.emit("productear", productos)
   // const productosContainer = document.getElementById("productos-container");
   //  productosContainer.innerHTML = ""; 
  
   //  // Construye el HTML con los datos de productos actualizados.
   // productos.forEach((producto) => {
   //    const productoElement = document.createElement("div");
   //    productoElement.innerHTML = `
   //      <p>${producto.title}</p>
   //      <p>${producto.price}</p>
   //    `;
   //    productosContainer.appendChild(productoElement);
   // });
})


// const express = require("express");
// const router = express.Router()

// leerProducto()
// let producto = products
// socket.on("productosActualizados", (productos) => {
//     // Limpiar el renderizado actual
//     const productosContainer = document.getElementById("productos-container");
//     productosContainer.innerHTML = ""; 
  
//     // Construye el HTML con los datos de productos actualizados.
//     productos.forEach((producto) => {
//       const productoElement = document.createElement("div");
//       productoElement.innerHTML = `
//         <p>${producto.title}</p>
//         <p>${producto.price}</p>
//       `;
//       productosContainer.appendChild(productoElement);
//     });
//   });

// router.get("/realtimeproducts", (req,res)=>{

//   res.render("realTimeProducts",{})
// })


//LEER PRODUCTOS EN PRODUCTOS.JSON
// function leerProducto() {
//     try {
//        const filePath = path.join(__dirname, '../../productos.json');
//        products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
//        return products;
//     } catch (error) {
//        console.error('Error de lectura:', error);
//     }
// }

// module.exports = router