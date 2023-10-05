const express = require("express");
const router = express.Router()
const {messageModel} = require("../models/messages.model")



//CONSULTAR POR LOS MENSAJES EXISTENTES
router.get("/", async(req, res) => {
    try{
      let msj = await messageModel.find()
      res.send({result: "success", payload: msj})
    } catch (error) {
      console.log(error)
    }
  });


//enviar mensaje
router.post("/", async(req,res)=>{
    let {user,message} = req.body
  
    if (!user || !message ){
        res.send({status: "error", error: "Faltan datos" })
    }
    let result = await messageModel.create({user,message})
    res.send({ result: "success", payload: result})
})


module.exports = router