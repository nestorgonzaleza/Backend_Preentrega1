import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'


const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: {type: String, max: 20, required: true},
    description: {type: String, max: 30, required: true},
    code: {type: String, max: 20, required: true},
    price: {type: Number, max: 1000000, required: true},
    productStatus: {type: Boolean, max: 20, required: true},
    stock: {type: Number, max: 20, required: true},
    category: {type: String, max: 20, required: true},
    thumbnails: {type: String, max: 50, required: false}
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)

export default productModel