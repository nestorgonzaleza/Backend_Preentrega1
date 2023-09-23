const express = require("express");
const http = require("http")
const socketIo = require("socket.io")
const handlebars = require("express-handlebars")
const path = require("path");
const {Server} = require("socket.io")
const productsRouter = require("./routes/productos.router")
const cartsRouter = require("./routes/carts.router")
// const realTimeProductsRouter = require("./routes/realtimeproducts.router")

const app = express()
const server = http.createServer(app)
const io = new Server(server)


const PORT= 8080


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

//endpoint socket
app.get("/realtimeproducts", (req,res)=>{
  res.render("realTimeProducts", {productos: products})
})



//socket.io
io.on("connection", (socket)=>{
  console.log("Un usuario se ha conectado")
 
})



//app listening//
app.listen(PORT, ()=>{
  console.log(`Server escuchando en ${PORT}`)
})


