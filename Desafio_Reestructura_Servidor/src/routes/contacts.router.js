import { Router } from "express";
import {Contacts} from "../dao/factory.js";
import ContactDTO from "../dao/DTOs/contact.dto.js"
import ContactRepository from "../repositories/Contacts.repository.js"
import { getContacts, getContactById,saveContact,updateContact,deleteContact } from "../controllers/contacts.controller.js";
const router = Router()

const contactsServices = new Contacts()

router.get("/", getContacts)
router.get("/:cid", getContactById)

// router.get("/:cid", async(req,res)=>{
//     let cid = req.params
//     let result = await contactsServices.
// })

router.post("/", saveContact)

router.put("/", updateContact)

router.delete("/", deleteContact)



export default router