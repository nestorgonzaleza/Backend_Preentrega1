const express = require("express");
const { userModel } = require("../models/user.model");
const { errorMonitor } = require("connect-mongo");
const router = express.Router()

router.post("/register", async (req,res)=>{
    try{
        let {first_name, last_name, email, age, password, rol} = req.body
        let nuevoUsuario = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            age: age,
            password,
            rol: rol
        }

        const data = await userModel.findOne({email:email})
        if(data){
            return res.status(409).json({ mensaje: 'El correo electrónico ya está en uso.' });
        }
        await userModel.create(nuevoUsuario)

        res.redirect("/login")
    } catch (error)
    {
        res.status(500).send("Error al ingresar: " + error.message)
    }
})

router.post("/login", async(req,res)=>{
    try
    {
        let email = req.body.email

        const data = await userModel.findOne({email:email})


        if(!data){
            return res.status(404).json({ result: "error", message: "El email proporcionado no se encuentra registrado" });
        }

        if(data.password === req.body.password){
            if(data.rol === 'admin'){
                req.session.emailUser = email
                req.session.nameUser = data.first_name
                req.session.lastNameUser = data.last_name
                req.session.rolUser = data.rol
                res.redirect("/profile")
            }else{
                req.session.emailUser = email
                req.session.rolUser = data.rol
                req.session.nameUser = data.first_name
                res.redirect("/products")
            }
        }else{
            res.redirect("/login")
        }
    } catch (error)
    {

        res.status(500).send("No se pudo acceder al perfil: "+error)
    }
})

router.get("/logout", (req,res)=>{
    req.session.destroy((error=>{

        if(error){
            return res.json({ status: "Logout Error", body: error})
        }
        res.redirect("/login")
    }))
})

module.exports = router