const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    address:{
        type:String,
        required: [true, 'Please enter a shipping address'],
        trim:true,
        maxLength:[50, 'Address cannot exceed 50 characters']
    },
    city:{
        type:String,
        required:[true, 'Please enter a city'],
    },
    phoneNo:{
        type:String,
        required:[true,'Please enter a phone number'],
        minlength:[10, 'Please enter a valid number'],
        maxlength:[10, 'Please enter a valid phone number'],
    },
    postalCode:{
        type:Number,
        required:[true,'Please enter your postal code'],
        minlength:[5, 'Please enter a valid postal code'],
        maxlength:[5, 'Please enter a valid postal code'],
        default:0
    },
    country:{
        type:String,
        required:[true, 'Please enter a country']
    }
})

module.exports = mongoose.model('Address', addressSchema);