const express = require("express");
const router = express.Router()
const fs = require('fs');
const path = require('path');


let products = [
    {"id":1,"title":"Aros A","description":"Aros bellos","code":1, "price":1000, "productStatus": true, "stock":10, "category": "Aros", "thumbnails":"ruta Aros"},
    {"id":2,"title":"Anillos","description":"Anillos bellos", "code":2, "price":2000, "productStatus": true, "stock":5, "category": "Anillos", "thumbnails":"ruta Anillos"},
    {"id":3,"title":"Collar","description":"Collar bonito","code":3, "price":4000, "productStatus": true, "stock":6, "category": "Collares", "thumbnails":"ruta Collar"},
    {"id":4,"title":"Pulsera","description":"Pulsera bonita","code":4, "price":3000, "productStatus": true, "stock":10, "category": "Pulseras", "thumbnails":"ruta Pulsera"}
  ]


//RUTA RAÍZ
router.get("/",(req,res)=>{

  leerProducto()

  res.render("home", { 
    productos: products 
  })
})  


//CONSULTA PRODUCTOS//
router.get("/api/products",(req,res)=>{
    try {
        leerProducto()
        let productos = products
        let limite = req.query.limit

        if(!limite || limite == 0 || limite > productos.length ){
            res.json(productos)
        } else {
            let productosLimite = productos.slice(0,limite)
            res.json(productosLimite)

        }
    } catch (error) {
        console.log(error)
    }
    
})


//CONSULTA PRODUCTOS POR ID//
router.get("/api/products/:pid", (req, res) => {
    try {
      leerProducto()
      const productos = products;
      const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));
      if (productoEncontrado) {
        res.json(productoEncontrado);
      } else {
        res.status(404).send("Producto no encontrado");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Error interno del servidor");
    }
  });


//AÑADIR PRODUCTO CON POST//
router.post("/api/products", (req, res) => {
  try {

    const product_id = products.length + 1 ;
    let {title, description, code, price, productStatus, stock, category, thumbnails} = req.body;


    if (title === '' || description === '' || isNaN(price) || code === '' || isNaN(stock) || category === '') {
      console.log('Los valores ingresados son inválidos');
      return;
    }else{
    const nuevoProducto = {
        id: product_id,
        title: title,
        description: description,
        code: code,
        price: price,
        productStatus: true,
        stock: stock,
        category: category,
        thumbnails: thumbnails
    }
    products.push(nuevoProducto)
    guardarProducto()
    console.log("Producto agregado correctamente")

    };
     
    } catch (error) {
      console.log(error);
      res.status(500).send("Error interno del servidor");
    }
  });


//ACTUALIZAR PRODUCTOS POR ID//
router.put("/api/products/:pid", (req, res) => {
  try {
    leerProducto()
    let {title, description, code, price, productStatus, stock, category, thumbnails} = req.body;
    const productos = products;
    const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));

    if (title === '' || description === '' || isNaN(price) || code === '' || isNaN(stock) || category === '') {
      console.log('Los valores ingresados son inválidos');
      return;
    }else{
      productoEncontrado.title = title
      productoEncontrado.description = description
      productoEncontrado.code = code
      productoEncontrado.price = price
      productoEncontrado.productStatus = true
      productoEncontrado.stock = stock
      productoEncontrado.category = category
      productoEncontrado.thumbnails = thumbnails
      
      console.log("Producto actualizado correctamente")  
        
    };

    guardarProducto() 
    } catch (error) {
      console.log(error);
      res.status(500).send("Error interno del servidor");
    }
  });


//ELIMINAR PRODUCTO POR ID//
router.delete("/api/products/:pid", (req, res) => {
  try {
    leerProducto()
    const productos = products;

    const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));
      if (productoEncontrado) {
        products = productos.filter((prod) => prod.id !== parseInt(req.params.pid));
        
      } else {
        res.status(404).send("Producto no encontrado");
      }
    
    guardarProducto() 
    } catch (error) {
      console.log(error);
      res.status(500).send("Error interno del servidor");
    }
  });





//FUNCIONES FILE SYSTEM//

//GUARDAR PRODUCTOS EN PRODUCTOS.JSON//
function guardarProducto() {
    try {
        const filePath = path.join(__dirname, '../../productos.json');
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
            if (err) {
                console.error('Error al crear el archivo:', err);
            } else {
                console.log('Archivo creado correctamente');
            }
        });
    } catch (error) {
        console.error('Error al crear el archivo:', error);
    }
}


  
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

  
module.exports = router