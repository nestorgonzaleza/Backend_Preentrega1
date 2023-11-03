import express from "express";
import { Router } from "express";
const chatRouter = Router()
import messageModel from "../models/messages.model.js"



//CONSULTAR POR LOS MENSAJES EXISTENTES
chatRouter.get("/", async(req, res) => {
    try{
      let msj = await messageModel.find()
      res.send({result: "success", payload: msj})
    } catch (error) {
      console.log(error)
    }
  });


//enviar mensaje
chatRouter.post("/", async(req,res)=>{
    let {user,message} = req.body
  
    if (!user || !message ){
        res.send({status: "error", error: "Faltan datos" })
    }
    let result = await messageModel.create({user,message})
    res.send({ result: "success", payload: result})
})


export default chatRouter