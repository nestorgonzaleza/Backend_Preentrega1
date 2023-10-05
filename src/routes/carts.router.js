const express = require("express");
const router = express.Router()
const fs = require('fs');
const path = require('path');
const {cartModel} = require("../models/carts.model")

//********************CARRITO********************//

// let carrito = []

//CONSULTAR POR LOS CARRITOS EXISTENTES
router.get("/", async(req, res) => {
  try{
    let carts = await cartModel.find()
    res.send({result: "success", payload: carts})
  } catch (error) {
    console.log(error)
  }
});


//AÑADIR UN NUEVO CARRITO VACÍO//
router.post("/", async(req, res) => {

  let result = await cartModel.create([[]])
    res.send({ result: "success", payload: result})


  //FS*****************************************************************  
  // try {
  //   leerCarrito()
  //   const cart_id = carrito.length + 1 ;
  //   const nuevoCarrito = {
  //     Id: cart_id,
  //     products: []
  //   };

  //   carrito.push(nuevoCarrito)
  //   console.log("Carrito añadido correctamente")
  //   guardarCarrito()
     
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send("Error interno del servidor");
  //   }
});



//CAMBIAR PRODUCTOS DE UN CARRITO INGRESANDO SU ID//
router.put("/:cid/product", async(req, res) => {
  let productosJSON = req.body
  let {cid} = req.params
  //transforma los productos ingresados en u narray para reemplazar al array anterior del carrito correspondiente
  let productsToUpdate = {};

  for (const key in productosJSON) {
    productsToUpdate[key] = productosJSON[key];
  }

 
  let result = await cartModel.updateOne({_id: cid}, {$set: {products : productsToUpdate}})
  res.send({result: "success", payload: result})


  //FS***************************************************
  // try {
  //   //encontrar Carrito//
  //   leerCarrito()
  //   const carritos = carrito;
  //   const carritoEncontrado = carritos.find((cart) => cart.Id === parseInt(req.params.cid));

  //   if (!carritoEncontrado) {
  //     res.status(404).send("Carrito no encontrado, favor ingresar un Id válido de carrito");
  //     return;
  //   }

  //   //encontrar Producto//
  //   leerProducto()
  //   const productos = products;
  //   const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));

  //   if (!productoEncontrado) {
  //     res.status(404).send("Producto no encontrado, favor ingresar un Id válido de los productos");
  //     return;
  //   }

  //   //añadir al carrito//
  //   const productoEnCarrito = carritoEncontrado.products.find((prod) => prod.id === parseInt(req.params.pid));

  //   if (productoEnCarrito) {
      
  //     productoEnCarrito.quantity += 1;

      
  //   } else {
  //     productoAgregado = {
  //       id: productoEncontrado.id,
  //       quantity: 1
  //     }
  //     carritoEncontrado.products.push(productoAgregado);

  //   }

  //   // Envía una respuesta después de todas las operaciones
  //   res.send("Producto agregado al carrito exitosamente");
  //   guardarCarrito();

  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send("Error interno del servidor");
  // }
});

router.delete("/:cid", async(req, res) => {
  let {cid} = req.params
  let result = await cartModel.deleteOne({_id: cid})
  res.send({result: "success", payload: result})


  // try {
  //   leerProducto()
  //   const productos = products;

  //   const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));
  //     if (productoEncontrado) {
  //       products = productos.filter((prod) => prod.id !== parseInt(req.params.pid));
        
  //     } else {
  //       res.status(404).send("Producto no encontrado");
  //     }
    
  //   guardarProducto() 
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send("Error interno del servidor");
  //   }
});

module.exports = router

//GUARDAR CARRITOS EN CARRITOS.JSON//
function guardarCarrito() {
    try {
        const filePath = path.join(__dirname, '../../carrito.json');
        fs.writeFileSync(filePath, JSON.stringify(carrito));
        console.log('Archivo creado correctamente');
    } catch (error) {
        console.error('Error al crear el archivo:', error);
    }
}
  
  //LEER CARRITOS EN CARRITOS.JSON
  
  function leerCarrito() {
    try {
        const filePath = path.join(__dirname, '../../carrito.json');
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






//CONSULTAR PRODUCTOS DENTRO DE UN CARRITO - NO REQUERIDA//
// router.get("/:cid", (req, res) => {
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