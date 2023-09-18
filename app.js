const express = require("express");
const path = require("path");
const productsRouter = require("./src/routes/productos.router")
const cartsRouter = require("./src/routes/carts.router")
const app = express()
const PORT = 8080
// const fs = require('fs');

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/", productsRouter)
app.use("/", cartsRouter)

//app listening//
app.listen(PORT, ()=>{
  console.log(`Server escuchando en ${PORT}`)
})




//********************PRODUCTS********************//

// let products = [
//     {"id":1,"title":"Aros A","description":"Aros bellos","code":1, "price":1000, "productStatus": true, "stock":10, "category": "Aros", "thumbnails":"ruta Aros"},
//     {"id":2,"title":"Anillos","description":"Anillos bellos", "code":2, "price":2000, "productStatus": true, "stock":5, "category": "Anillos", "thumbnails":"ruta Anillos"},
//     {"id":3,"title":"Collar","description":"Collar bonito","code":3, "price":4000, "productStatus": true, "stock":6, "category": "Collares", "thumbnails":"ruta Collar"},
//     {"id":4,"title":"Pulsera","description":"Pulsera bonita","code":4, "price":3000, "productStatus": true, "stock":10, "category": "Pulseras", "thumbnails":"ruta Pulsera"}
//   ]


// //CONSULTA PRODUCTOS//
// app.get("/api/products",(req,res)=>{
//     try {
//         leerProducto()
//         let productos = products
//         let limite = req.query.limit

//         if(!limite || limite == 0 || limite > productos.length ){
//             res.json(productos)
//         } else {
//             let productosLimite = productos.slice(0,limite)
//             res.send(productosLimite)

//         }
//     } catch (error) {
//         console.log(error)
//     }
    
// })


// //CONSULTA PRODUCTOS POR ID//
// app.get("/api/products/:pid", (req, res) => {
//     try {
//       leerProducto()
//       const productos = products;
//       const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));
//       if (productoEncontrado) {
//         res.send(productoEncontrado);
//       } else {
//         res.status(404).send("Producto no encontrado");
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Error interno del servidor");
//     }
//   });


// //AÑADIR PRODUCTO CON POST//
// app.post("/api/products", (req, res) => {
//   try {

//     const product_id = products.length + 1 ;
//     let {title, description, code, price, productStatus, stock, category, thumbnails} = req.body;


//     if (title === '' || description === '' || isNaN(price) || code === '' || isNaN(stock) || category === '') {
//       console.log('Los valores ingresados son inválidos');
//       return;
//     }else{
//     const nuevoProducto = {
//         id: product_id,
//         title: title,
//         description: description,
//         code: code,
//         price: price,
//         productStatus: true,
//         stock: stock,
//         category: category,
//         thumbnails: thumbnails
//     }
//     products.push(nuevoProducto)
//     guardarProducto()
//     console.log("Producto agregado correctamente")
//     };
     
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Error interno del servidor");
//     }
//   });


// //ACTUALIZAR PRODUCTOS POR ID//
// app.put("/api/products/:pid", (req, res) => {
//   try {
//     leerProducto()
//     let {title, description, code, price, productStatus, stock, category, thumbnails} = req.body;
//     const productos = products;
//     const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));

//     if (title === '' || description === '' || isNaN(price) || code === '' || isNaN(stock) || category === '') {
//       console.log('Los valores ingresados son inválidos');
//       return;
//     }else{
//       productoEncontrado.title = title
//       productoEncontrado.description = description
//       productoEncontrado.code = code
//       productoEncontrado.price = price
//       productoEncontrado.productStatus = true
//       productoEncontrado.stock = stock
//       productoEncontrado.category = category
//       productoEncontrado.thumbnails = thumbnails
      
//       console.log("Producto actualizado correctamente")  
        
//     };

//     guardarProducto() 
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Error interno del servidor");
//     }
//   });


// //ELIMINAR PRODUCTO POR ID//
// app.delete("/api/products/:pid", (req, res) => {
//   try {
//     leerProducto()
//     const productos = products;

//     const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));
//       if (productoEncontrado) {
//         products = productos.filter((prod) => prod.id !== parseInt(req.params.pid));
        
//       } else {
//         res.status(404).send("Producto no encontrado");
//       }
    
//     guardarProducto() 
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Error interno del servidor");
//     }
//   });



// //********************CARRITO********************//

// let carrito = []

// //AÑADIR UN NUEVO CARRITO VACÍO//
// app.post("/api/carts", (req, res) => {
//   try {
//     leerCarrito()
//     const cart_id = carrito.length + 1 ;
//     const nuevoCarrito = {
//       Id: cart_id,
//       products: []
//     };

//     carrito.push(nuevoCarrito)
//     console.log("Carrito añadido correctamente")
//     guardarCarrito()
     
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Error interno del servidor");
//     }
//   });


// //CONSULTAR PRODUCTOS DENTRO DE UN CARRITO//
// app.get("/api/carts/:cid", (req, res) => {
//   try {
//     leerCarrito()
//     const carritos = carrito;
//     const carritoEncontrado = carritos.find((cart) => cart.Id === parseInt(req.params.cid));
//     if (carritoEncontrado) {
//       res.send(carritoEncontrado.products);
//     } else {
//       res.status(404).send("Carrito no encontrado");
//     }
    
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error interno del servidor");
//   }
// });


// //AÑADIR PRODUCTO AL CARRITO CON POST//
// app.post("/api/carts/:cid/product/:pid", (req, res) => {
//   try {
//     //encontrar Carrito//
//     leerCarrito()
//     const carritos = carrito;
//     const carritoEncontrado = carritos.find((cart) => cart.Id === parseInt(req.params.cid));

//     if (!carritoEncontrado) {
//       res.status(404).send("Carrito no encontrado, favor ingresar un Id válido de carrito");
//       return;
//     }

//     //encontrar Producto//
//     leerProducto()
//     const productos = products;
//     const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));

//     if (!productoEncontrado) {
//       res.status(404).send("Producto no encontrado, favor ingresar un Id válido de los productos");
//       return;
//     }

//     //añadir al carrito//
//     const productoEnCarrito = carritoEncontrado.products.find((prod) => prod.id === parseInt(req.params.pid));

//     if (productoEnCarrito) {
      
//       productoEnCarrito.quantity += 1;

      
//     } else {
//       productoAgregado = {
//         id: productoEncontrado.id,
//         quantity: 1
//       }
//       carritoEncontrado.products.push(productoAgregado);

//     }

//     // Envía una respuesta después de todas las operaciones
//     res.send("Producto agregado al carrito exitosamente");
//     guardarCarrito();

//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error interno del servidor");
//   }
// });








//FUNCIONES FILE SYSTEM//

//GUARDAR PRODUCTOS EN PRODUCTOS.JSON//
// function guardarProducto() {
//   try {
//       fs.writeFile('productos.json', JSON.stringify(products));
//       console.log('Archivo creado correctamente');
//   } catch (error) {
//       console.error('Error al crear el archivo');
//   }
// }

// //LEER PRODUCTOS EN PRODUCTOS.JSON

// function leerProducto() {

//   try{
  
//   products = JSON.parse(fs.readFileSync("productos.json","utf-8"))
  
//   return products
  
//   }catch(error){
  
//   console.error("Error de lectura")
  
//   }
  
//   }





//GUARDAR CARRITOS EN CARRITOS.JSON//
// function guardarCarrito() {
//   try {
//        fs.writeFile('carrito.json', JSON.stringify(carrito));
//       console.log('Archivo creado correctamente');
//   } catch (error) {
//       console.error('Error al crear el archivo');
//   }
// }

// //LEER CARRITOS EN CARRITOS.JSON

// function leerCarrito() {

//   try{
  
//   carrito = JSON.parse(fs.readFileSync("carrito.json","utf-8"))
  
//   return carrito
  
//   }catch(error){
  
//   console.error("Error de lectura")
  
//   }
  
//   }