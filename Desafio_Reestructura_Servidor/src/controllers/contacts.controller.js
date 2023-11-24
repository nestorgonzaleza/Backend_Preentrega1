import Contact from "../dao/mongo/contacts.mongo.js"

const contactsService = new Contact()

export const getContacts = async (req,res)=>{
    let result = await contactsService.getContacts()
    res.send({status: "success", result: result})
}

export const getContactById = async (req,res) =>{
    const {cid} = req.params
    let contact = await contactsService.getContactById(cid)
    res.send({status: "success", result: contact})
}

export const saveContact = async (req,res)=>{
    const contact = req.body
    let result = await contactsService.saveContact(contact)
    res.send({status:"success", result: result})
}

export const updateContact = async (req,res)=>{
    const {id, contact} = req.body
    let result = await contactsService.updateContact(id, contact)
    res.send({status:"success", result: result})
}

export const deleteContact = async (req,res)=>{
    const id = req.body
    let result = await contactsService.deleteContact(id)
    res.send({status:"success", result: result})
}