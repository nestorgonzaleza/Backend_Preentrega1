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


