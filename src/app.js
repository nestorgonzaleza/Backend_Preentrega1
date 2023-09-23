const express = require("express");
const handlebars = require("express-handlebars")
const path = require("path");
const productsRouter = require("./routes/productos.router")
const cartsRouter = require("./routes/carts.router")
const app = express()
const PORT = 8080

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//handlebars configuración
app.engine("handlebars", handlebars.engine())
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "handlebars")
app.use(express.static(path.join(__dirname, "public")))

//routers
app.use("/", productsRouter)
app.use("/", cartsRouter)

//app listening//
app.listen(PORT, ()=>{
  console.log(`Server escuchando en ${PORT}`)
})


