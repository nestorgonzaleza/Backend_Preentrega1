import express from "express";
import {Router} from "express";
import { createHash, isValidPassword} from "../utils.js";
import passport from "passport";

const userRouter = Router()


userRouter.post("/register", passport.authenticate("register", {failureRedirect: "/failregister"}), async (req,res)=>{
    try{
        let {first_name, last_name, email, age, password, rol} = req.body
        if (!first_name || !last_name || !email || !age) return res.status(400).send({status:400, error: "Faltan datos"})
        res.redirect("/login")

    } catch (error)
    {
        res.status(500).send("Error al ingresar: " + error.message)
    }
})

userRouter.get("/failregister", async (req,res)=>{
    console.log("Falló la estrategia")
    res.send({error: "Failure"})
})

userRouter.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"}) ,async(req,res)=>{
    try
    {
        if(!req.user) return res.status(400).send({status:"error", error: "Credencial inválida"})

        if(req.user.rol === "admin"){
            req.session.emailUser = req.user.email
            req.session.nameUser = req.user.first_name
            req.session.lastNameUser = req.user.last_name
            req.session.rolUser = req.user.rol
            res.redirect("/profile")
        }else{
            req.session.emailUser = req.useremail
            req.session.rolUser = req.user.rol
            req.session.nameUser = req.user.first_name
            res.redirect("/products")
        }
        
    } catch (error)
    {

        res.status(500).send("No se pudo acceder al perfil: "+error)
    }
})

userRouter.get("/faillogin", async(req,res)=>{
    res.send({error: "Failed login"})
})

userRouter.get("/logout", (req,res)=>{
    console.log(req.session)
    req.session.destroy((error=>{

        if(error){
            return res.json({ status: "Logout Error", body: error})
        }
        res.redirect("/login")
    }))
})

userRouter.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async(req,res)=>{})

userRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/login"}), async(req,res)=>{
    req.session.user = req.user
    req.session.emailUser = req.session.user.email
    req.session.rolUser = req.session.user.rol
    req.session.nameUser=req.session.user.email
    res.redirect("/products")
})

export default userRouter