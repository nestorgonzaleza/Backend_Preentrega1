const express = require("express");
const router = express.Router()
const fs = require('fs');
const path = require('path');
const {productModel} = require("../models/productos.model")

let products = [
    {"id":1,"title":"Aros A","description":"Aros bellos","code":1, "price":1000, "productStatus": true, "stock":10, "category": "Aros", "thumbnails":"ruta Aros"},
    {"id":2,"title":"Anillos","description":"Anillos bellos", "code":2, "price":2000, "productStatus": true, "stock":5, "category": "Anillos", "thumbnails":"ruta Anillos"},
    {"id":3,"title":"Collar","description":"Collar bonito","code":3, "price":4000, "productStatus": true, "stock":6, "category": "Collares", "thumbnails":"ruta Collar"},
    {"id":4,"title":"Pulsera","description":"Pulsera bonita","code":4, "price":3000, "productStatus": true, "stock":10, "category": "Pulseras", "thumbnails":"ruta Pulsera"}
  ]


//RUTA RAÍZ
router.get("/", async(req,res)=>{
    const consulta = {}
    const opciones = {}
    ordenar = {}
    limit = parseInt(req.query.limit)
    page = parseInt(req.query.page)
    filtro = req.query.query
    orden = parseInt(req.query.sort)

    //LIMIT
    if(!limit){
        limit = 10    
    }
    opciones.limit = limit
    // stages.push({
    //     $limit: limit
    // })

    //PAGE
    if(!page){
        page = 1
    }  
    opciones.page = page
    // stages.push({
    //     page: page
    // })
    
    //QUERY - FILTRO POR CATEGORIA
    if(filtro){
        consulta.category = filtro
        // stages.push({
        //     $match: {category: filtro}
        // })
    }    
   

    //SORT
    if(req.query.sort === 1 || req.query.sort === -1){
        ordenar.price = orden
    }




  try{
      let products = await productModel.paginate(consulta,opciones,ordenar)
      res.send({result: "success", payload: products})
      
  } catch (error) {
      console.log(error)
  }
  //FS**********************************************************
  // leerProducto()

//   res.render("home", { 
//     productos: products 
//   })
})  


//VISTA PAGINACION
router.get("/all", async(req,res)=>{
    
    try {
                
        let totalProducts = await productModel.find();
        totalProducts = totalProducts.map(product=> product.toJSON())
        
        
       
        res.render('products', {products: totalProducts} );
      } catch (error) {
        console.log(error);
        res.status(500).json({ result: 'error', message: 'Error en la consulta.' });
      }
})  


//AÑADIR PRODUCTO CON POST//
router.post("/", async(req,res)=>{
  let {title, description, code, price, productStatus, stock, category, thumbnails} = req.body

  if (!title || !description  || !code || !price || !productStatus || !stock || !category ){
      res.send({status: "error", error: "Faltan datos" })
  }
  let result = await productModel.create({title, description, code, price, productStatus, stock, category, thumbnails})
  res.send({ result: "success", payload: result})


  //FS**********************************************************
  // try {
  //   leerProducto()
  //   const product_id = products.length + 1 ;
  //   let {title, description, code, price, productStatus, stock, category, thumbnails} = req.body;


  //   if (title === '' || description === '' || isNaN(price) || code === '' || isNaN(stock) || category === '') {
  //     console.log('Los valores ingresados son inválidos');
  //     return;
  //   }else{
  //   const nuevoProducto = {
  //       id: product_id,
  //       title: title,
  //       description: description,
  //       code: code,
  //       price: price,
  //       productStatus: true,
  //       stock: stock,
  //       category: category,
  //       thumbnails: thumbnails
  //   }
  //   products.push(nuevoProducto)
  //   guardarProducto()
  //   console.log("Producto agregado correctamente")

  //   };
     
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send("Error interno del servidor");
  //   }
});


//ACTUALIZAR PRODUCTOS POR ID//
router.put("/:pid", async(req, res) => {
  let {pid} = req.params

  let productToReplace = req.body
  if( !productToReplace.title || !productToReplace.description  || !productToReplace.code || !productToReplace.price || !productToReplace.productStatus || !productToReplace.stock || !productToReplace.category){
      res.send({status: "error", error: "No hay datos en parámetros"})
  }

  let result = await productModel.updateOne({_id: pid}, productToReplace)
  res.send({result: "success", payload: result})


  //FS**********************************************************
  // try {
  //   leerProducto()
  //   let {title, description, code, price, productStatus, stock, category, thumbnails} = req.body;
  //   const productos = products;
  //   const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));

  //   if (title === '' || description === '' || isNaN(price) || code === '' || isNaN(stock) || category === '') {
  //     console.log('Los valores ingresados son inválidos');
  //     return;
  //   }else{
  //     productoEncontrado.title = title
  //     productoEncontrado.description = description
  //     productoEncontrado.code = code
  //     productoEncontrado.price = price
  //     productoEncontrado.productStatus = true
  //     productoEncontrado.stock = stock
  //     productoEncontrado.category = category
  //     productoEncontrado.thumbnails = thumbnails
      
  //     console.log("Producto actualizado correctamente")  
        
  //   };

  //   guardarProducto() 
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send("Error interno del servidor");
  //   }
});


//ELIMINAR PRODUCTO POR ID//
router.delete("/:pid", async(req, res) => {
  let {pid} = req.params
  let result = await productModel.deleteOne({_id: pid})
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

  










//CONSULTA UN N DE PRODUCTOS - NO REQUERIDA//
// router.get("/nproducts", async(req,res)=>{
//   try{
//       let products = userModel.find()
//       res.send({result: "success", payload: products})
//   } catch (error) {
//       console.log(error)
//   }

    //CON FYLE SYSTEM
    // try {
    //     leerProducto()
    //     let productos = products
    //     let limite = req.query.limit

    //     if(!limite || limite == 0 || limite > productos.length ){
    //         res.json(productos)
    //     } else {
    //         let productosLimite = productos.slice(0,limite)
    //         res.json(productosLimite)

    //     }
    // } catch (error) {
    //     console.log(error)
    // }
    
// })


//CONSULTA PRODUCTOS POR ID - NO REQUERIDA//
// router.get("/:pid", (req, res) => {
//     try {
//       leerProducto()
//       const productos = products;
//       const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));
//       if (productoEncontrado) {
//         res.json(productoEncontrado);
//       } else {
//         res.status(404).send("Producto no encontrado");
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Error interno del servidor");
//     }
//   });