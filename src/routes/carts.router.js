import express from "express";
import { Router } from "express";
import fs from "fs";
import path from "path";
import cartModel from "../models/carts.model.js"

const cartsRouter = Router()


//********************CARRITO********************//

// let carrito = []

//CONSULTAR POR LOS CARRITOS EXISTENTES
cartsRouter.get("/", async(req, res) => {
  try{
    let carts = await cartModel.find().populate('products.id')
    res.send({result: "success", payload: carts})
  } catch (error) {
    console.log(error)
  }
});

//CONSULTAR POR UN CARRITO ESPECIFICO
cartsRouter.get("/:cid", async(req, res) => {
  try{
    let {cid} = req.params
    let carts = await cartModel.findOne({_id:cid}).populate('products.id')
    res.send({result: "success", payload: carts.products})
  } catch (error) {
    console.log(error)
  }
});

//AÑADIR UN NUEVO CARRITO VACÍO//
cartsRouter.post("/", async(req, res) => {

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



//ACTUALIZAR PRODUCTOS DE UN CARRITO//
cartsRouter.put("/:cid", async(req, res) => {
  try{
    let productsUpdate = req.body
    let {cid} = req.params

  
    let result = await cartModel.updateOne({_id: cid}, {$set: {products : productsUpdate}})
    res.send({result: "success", payload: result})

  } catch(error){
    console.error(error)
    res.status(500).json({ result: "error", message: "Error interno del servidor" });
  }

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

//ACTUALIZAR LA CANTIDAD DEL PRODUCTO INDICADO DEL CARRO INDICADO
cartsRouter.put("/:cid/products/:pid", async(req, res) => {
  try{
    let {cid} = req.params
    let {pid} = req.params
    let {newQuantity} = req.body
    const carro = await cartModel.findOne({_id : cid})
    if (!carro) {
      return res.status(404).json({ result: "error", message: "El ID proporcionado no coincide con ningún carro" });
    }

    const productToUp = carro.products.find((products)=>products.id == pid)
    if (!productToUp) {
      return res.status(404).json({ result: "error", message: "El ID proporcionado no coincide con ningún producto" });
    }
    productToUp.quantity = newQuantity

    const nuevosProductos = carro.products.filter((products)=>products.id !== pid)
    nuevosProductos.push(productToUp)

    let result = await cartModel.updateOne({_id: cid}, {$set: {products : nuevosProductos}})
    res.send({result: "success", payload: result})

  } catch (error){
    console.error(error);
    res.status(500).json({ result: "error", message: "Error interno del servidor" });
  }

});

//ELIMINAR PRODUCTO DEL CARRO INDICADO
cartsRouter.delete("/:cid/products/:pid", async(req, res) => {
  try{
    let {cid} = req.params
    let {pid} = req.params

    const carro = await cartModel.findOne({_id : cid})
    if (!carro) {
      return res.status(404).json({ result: "error", message: "El ID proporcionado no coincide con ningún carro" });
    }

    const nuevosProductos = carro.products.filter((products)=>products.id !== pid)
    
    let result = await cartModel.updateOne({_id: cid}, {$set: {products : nuevosProductos}})
    res.send({result: "success", payload: result})

  } catch (error){
    console.error(error);
    res.status(500).json({ result: "error", message: "Error interno del servidor" });
  }

  
  // let result = await cartModel.deleteOne({_id: cid})
  // res.send({result: "success", payload: result})


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

export default cartsRouter

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