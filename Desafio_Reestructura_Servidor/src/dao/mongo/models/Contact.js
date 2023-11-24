import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone: String
})

const Contact = mongoose.model("contact", contactSchema)

export default Contact