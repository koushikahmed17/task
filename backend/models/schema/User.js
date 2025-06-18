const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customer',
    },

    bio: {
        type: String,
        default: ''
    },
    phone:{
        type:String,
        default:''
    },
    orderUpdates:{
        type:Boolean,
        default:false
    },
    promotion:{
        type:Boolean,
        default:false
    },
    newsletter:{
        type:Boolean,
        default:false
    },
    wishlistUpdates:{
        type:Boolean,
        default:false
    },
    addresses: {
        type: Array,
        default: []
    }

})

module.exports = mongoose.model('User', UserSchema)