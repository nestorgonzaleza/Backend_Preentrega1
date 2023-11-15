import express from "express";
import http from "http";
// import socketIo from "socket.io";
import handlebars from "express-handlebars";
import path from "path";
import {Server} from "socket.io";
import productsRouter from "./routes/productos.router.js";
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";
import userRouter from "./routes/user.router.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import FileStore from "session-file-store";
import cookieParser from "cookie-parser";
import fs from "fs";
import productModel from "./models/productos.model.js";
import __dirname from "./utils.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import cartModel from "./models/carts.model.js";
import userModel from "./models/user.model.js";
import { createAndSetToken } from "./jwt/jwtoken.js";
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJwt } from 'passport-jwt';
import { passportCall } from "./utils.js";
import { authorization } from "./utils.js";
// const realTimeProductsRouter = require("./public/realtimeproducts.router")

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const fileStorage = FileStore(session)

const PORT= 8080

const users = userModel.find()
const carts = cartModel.find()

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

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Secret-key"
}

passport.use(
  new JwtStrategy(jwtOptions, (jwt_payload, done)=>{
    const user = users.find((user)=>user.email === jwt_payload.email)
    if(!user)
    {
      return done(null, false, {message: "Usuario no encontrado"})
    }
    return done(null, user)
  })
)

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//cookieparser
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

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





//ENDPONT DETALLES
app.get("/product/:pid", async (req,res)=>{
  let {pid} = req.params
  let detalle = await productModel.findOne({_id:pid})
  detalle = detalle.toJSON()
  res.render("detailProduct", {product: detalle})
})

//http://localhost:8080/products
app.get("/products", async (req,res)=>{
  // if(!req.session.emailUser){
  //   return res.redirect("/login")
  // }

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

app.post("/login", async(req,res)=>{
  const {email,password} = req.body

  const emailToFind = email
  const user = await users.findOne({email: emailToFind})

  if (!user || user.password !== password){
    return res.statusCode(401).json({message: "Error de autenticación"})
  }
  const token = createAndSetToken(res, email, password);
  res.json({token, user: {emil: user.email, rol: user.rol}})
})

app.post("/api/register", async(req,res)=>{
  const {first_name, last_name, email, age, password, rol} = req.body
  const emailToFind = email
  const exists = await users.findOne({email: emailToFind})
  if(exists) return res.status(400).send({status:"error", error: "Usuario ya existe"})

  const newUser = {
    first_name,
    last_name,
    email,
    age,
    password,
    cart: cartModel.create([[]]),
    rol
  }
  userModel.create(newUser)
  const token = createAndSetToken(res, email, password)
  res.send({token})
})

app.get("/", (req,res)=>{
  // res.sendFile("index.html", { root: app.get("views")})
  res.render("register")
})

app.get("/current", passportCall("jwt"), authorization("user"), (req,res)=>{
  res.redirect("/products")
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




