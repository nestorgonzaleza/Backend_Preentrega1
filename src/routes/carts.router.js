const express = require("express");
const router = express.Router()
const fs = require('fs');
const path = require('path');

//********************CARRITO********************//

let carrito = []

//AÑADIR UN NUEVO CARRITO VACÍO//
router.post("/api/carts", (req, res) => {
  try {
    leerCarrito()
    const cart_id = carrito.length + 1 ;
    const nuevoCarrito = {
      Id: cart_id,
      products: []
    };

    carrito.push(nuevoCarrito)
    console.log("Carrito añadido correctamente")
    guardarCarrito()
     
    } catch (error) {
      console.log(error);
      res.status(500).send("Error interno del servidor");
    }
  });


//CONSULTAR PRODUCTOS DENTRO DE UN CARRITO//
router.get("/api/carts/:cid", (req, res) => {
  try {
    leerCarrito()
    const carritos = carrito;
    const carritoEncontrado = carritos.find((cart) => cart.Id === parseInt(req.params.cid));
    if (carritoEncontrado) {
      res.send(carritoEncontrado.products);
    } else {
      res.status(404).send("Carrito no encontrado");
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
});


//AÑADIR PRODUCTO AL CARRITO CON POST//
router.post("/api/carts/:cid/product/:pid", (req, res) => {
  try {
    //encontrar Carrito//
    leerCarrito()
    const carritos = carrito;
    const carritoEncontrado = carritos.find((cart) => cart.Id === parseInt(req.params.cid));

    if (!carritoEncontrado) {
      res.status(404).send("Carrito no encontrado, favor ingresar un Id válido de carrito");
      return;
    }

    //encontrar Producto//
    leerProducto()
    const productos = products;
    const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));

    if (!productoEncontrado) {
      res.status(404).send("Producto no encontrado, favor ingresar un Id válido de los productos");
      return;
    }

    //añadir al carrito//
    const productoEnCarrito = carritoEncontrado.products.find((prod) => prod.id === parseInt(req.params.pid));

    if (productoEnCarrito) {
      
      productoEnCarrito.quantity += 1;

      
    } else {
      productoAgregado = {
        id: productoEncontrado.id,
        quantity: 1
      }
      carritoEncontrado.products.push(productoAgregado);

    }

    // Envía una respuesta después de todas las operaciones
    res.send("Producto agregado al carrito exitosamente");
    guardarCarrito();

  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
});


//GUARDAR CARRITOS EN CARRITOS.JSON//
function guardarCarrito() {
    try {
        const filePath = path.join(__dirname, 'carrito.json');
        fs.writeFileSync(filePath, JSON.stringify(carrito));
        console.log('Archivo creado correctamente');
    } catch (error) {
        console.error('Error al crear el archivo:', error);
    }
}
  
  //LEER CARRITOS EN CARRITOS.JSON
  
  function leerCarrito() {
    try {
        const filePath = path.join(__dirname, 'carrito.json');
        carrito = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return carrito;
    } catch (error) {
        console.error('Error de lectura:', error);
    }
}


function leerProducto() {
    try {
        const filePath = path.join(__dirname, '../../productos.json');
        products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return products;
    } catch (error) {
        console.error('Error de lectura:', error);
    }
}



module.exports = router