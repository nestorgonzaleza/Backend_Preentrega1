import express from "express"
import mongoose from "mongoose"
import contactsRouter from "./routes/contacts.router.js"

const app = express()
const port = 8080

mongoose.connect("mongodb+srv://nestorgonzalez:012342023@clusterbackend.m8mx5zs.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la BD")
})
.catch((error)=>{
    console.error(`Error al intentar conectar a la BD ${error}`)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})

app.use("/contacts", contactsRouter)