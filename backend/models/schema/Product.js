const e = require('express');
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
 
    
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'low stock ', 'out of stock'],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    desscription:{
        type: String,
        required: true
    },
    tags:{
        type:[String],
        required: true
    },
    seoTitle:{
        type: String,
        required: true
    },
    seoDescription:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Product', ProductSchema);