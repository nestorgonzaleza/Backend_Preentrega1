const mongoose = require("mongoose")

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({

    products: {type: Array, max: 15, required: true},

})

const cartModel = mongoose.model(cartCollection, cartSchema)

module.exports = {cartModel}