import mongoose from "mongoose";

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({

    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
    ]    
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel