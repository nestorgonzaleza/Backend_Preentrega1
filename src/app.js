const express = require("express")
const app = express()
const PORT = 8080
const fs = require('fs');
// import leerPackageJson from "/productManager"

app.use(express.urlencoded({extended:true}))



app.get("/products",(req,res)=>{
    try {
        productos = JSON.parse(fs.readFileSync("data.json","utf-8"))
        let limite = req.query.limit

        if(!limite || limite == 0 || limite > productos.length ){
            res.send(productos)
        } else {
            let productosLimite = productos.slice(0,limite)
            res.send(productosLimite)

        }
    } catch (error) {
        console.log(error)
    }
    
})

app.get("/products/:pid", (req, res) => {
    try {
      const productos = JSON.parse(fs.readFileSync("data.json", "utf-8"));
      const productoEncontrado = productos.find((prod) => prod.id === parseInt(req.params.pid));
      if (productoEncontrado) {
        res.send(productoEncontrado);
      } else {
        res.status(404).send("Producto no encontrado");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Error interno del servidor");
    }
  });

app.listen(PORT, ()=>{
    console.log(`Server escuchando en ${PORT}`)
})