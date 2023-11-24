import contactsModel from "./models/Contacts.js"

export default class Contacts {
    constructor() {

    }

    getContacts = async () => {
        try{
            let contacts = await contactsModel.find()
            return contacts
        } catch (error) {
            console.log(error)
            return null
        }    
    }

    getContactById = async (id) => {
        try{
            let contact = await contactsModel.findOne({_id: id})
            return contact
        } catch(error){
            console.log(error)
            return null
        }
    }

    saveContact = async (contact) => {
        try {
            let result = await contactsModel.create(contact)
            return result
        }catch (error){
            console.log(error)
            return null
        }
    }

    updateContact = async(id, contact) =>{
        try{
            let result = await contactsModel.updateOne({_id: id}, {$set: contact})
            return result
        }catch (error){
            console.log(error)
            return null
        }
    }

    deleteContact = async(id) =>{
        try{
            let result = await contactsModel.deleteOne({_id:id})
            return result
        }catch(error){
            console.log(error)
            return null
        }
    }
}