const express = require("express");
const http = require("http")
const socketIo = require("socket.io")
const handlebars = require("express-handlebars")
const path = require("path");
const {Server} = require("socket.io")
const productsRouter = require("./routes/productos.router")
const cartsRouter = require("./routes/carts.router")
const chatRouter = require("./routes/chat.router")
const userRouter = require("./routes/user.router")
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")
const session = require("express-session")
const FileStore = require("session-file-store")
const cookieParser = require("cookie-parser")
// const realTimeProductsRouter = require("./public/realtimeproducts.router")
const fs = require("fs");
const { productModel } = require("./models/productos.model");




const app = express()
const server = http.createServer(app)
const io = new Server(server)
const fileStorage = FileStore(session)

const PORT= 8080


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//cookieparser
app.use(cookieParser())





//Mongoose
mongoose.connect("mongodb+srv://nestorgonzalez:012342023@clusterbackend.m8mx5zs.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Conectado a la BD")
    })
    .catch((error)=>{
        console.error(`Error al intentar conectar a la BD ${error}`)
    })

//Sesiones Mongo Atlas
app.use(session({
  // store: new fileStorage({path: './sessions', ttl:100, retries:0}), era para gestion de archivos locales
  store: MongoStore.create({
      mongoUrl: "mongodb+srv://nestorgonzalez:012342023@clusterbackend.m8mx5zs.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {useNewUrlParser: true, useUnifiedTopology:true},
      ttl: 3000}),
  secret: "ClaveSecreta",
  resave: true,
  saveUninitialized: true
}))

//routers
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/messages", chatRouter)
app.use("/api/sessions", userRouter)

//handlebars configuración
app.engine("handlebars", handlebars.engine())
//Carpeta de vista
app.set("views", path.join(__dirname, "views"))
//Esteblecer handlebars como motor de plantillas
app.set("view engine", "handlebars")

//Servir archivos estáticos
app.use(express.static(__dirname+"/views"))
app.use(express.static(__dirname+"/routes"))
//Archivos dentro de la carpeta public
app.use(express.static(path.join(__dirname, "public")))


//ENDPOINT CHAT
app.get("/", (req,res)=>{
  let user = {
    cargo : "Profe",
    institucion : "Coderhouse"

  }
  res.render("chat", {user:user})
})

//ENDPONT DETALLES
app.get("/product/:pid", async (req,res)=>{
  let {pid} = req.params
  let detalle = await productModel.findOne({_id:pid})
  detalle = detalle.toJSON()
  res.render("detailProduct", {product: detalle})
})

//http://localhost:8080/products
app.get("/products", async (req,res)=>{
  if(!req.session.emailUser){
    return res.redirect("/login")
  }

    //pagina a mostrar
    const page = parseInt(req.query.page) || 1;
    //limite de elementos a mostrar
    const limit = 5;         
    let totalProducts = await productModel.paginate({},{page,limit});

   
    let productsRender = totalProducts.docs.map(product => product.toJSON())

    const previousPage = page - 1;
    const nextPage = page + 1;
    

    res.render('products', {
      products: productsRender,
      pageCount: totalProducts.totalPages,
      currentPage: page,
      previousPage: previousPage,
      nextPage: nextPage,
      hasPrevius : totalProducts.hasPrevPage,
      hasNext : totalProducts.hasNextPage,
      name: req.session.nameUser
    } );
  
})

//http://localhost:8080/login
app.get("/login", async (req,res)=>{
  res.render("login")
})

//http://localhost:8080/register
app.get("/register", async(req,res)=>{
  res.render("register")
})

//http://localhost:8080/profile
app.get("/profile", async (req,res)=>{
  if(!req.session.emailUser){
    return res.redirect("/login")
  }
  res.render("profile",{
    first_name: req.session.nameUser,
    last_name: req.session.lastNameUser,
    email: req.session.emailUser,
    rol: req.session.rolUser
  })
})




//SOCKETS
// endpoint socket
app.get("/realtimeproducts", (req,res)=>{
  res.render("realTimeProducts.handlebars")
})


//socket.io
io.on("connection", (socket) => {
  console.log("Un usuario se ha conectado");

  socket.on("disconnect", ()=>{
    console.log("Usuario desconectado")
  })
  socket.on("message", (data)=>{
    console.log(data)
  })  
  socket.on("solicitarProductos", () => {
    const productos = leerProducto();

    socket.emit("mostrarProductos", productos)
  });

 
});





//app listening//
server.listen(PORT, ()=>{
  console.log(`Server escuchando en ${PORT}`)
})




