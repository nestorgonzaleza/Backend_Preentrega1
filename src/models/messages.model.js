import mongoose from "mongoose";

const messageCollection = "messages"

const messageSchema = new mongoose.Schema({
    user: {type: String, max: 20, required: true},
    message: {type: String, max: 100, required: true}
})

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel