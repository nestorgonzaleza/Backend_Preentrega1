import mongoose from "mongoose"
import config from "../config/config.js"

export let Contacts 
switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect("mongodb+srv://nestorgonzalez:012342023@clusterbackend.m8mx5zs.mongodb.net/?retryWrites=true&w=majority")
        const { default : ContactsMongo } = await import("./mongo/contacts.mongo.js")
        Contacts = ContactsMongo
        break;
    case "MEMORY":
        const { default: ContactsMemory} = await import("./memory/contacts.memory.js")
        Contacts = ContactsMemory
        break

    default:
}