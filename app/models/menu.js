const mongoose = require("mongoose");

const Schema = mongoose.Schema


const menuSchema= new Schema({
    
    name: { type: String, required: true },
    Image: { type: String, requires: true },
    price: { type: Number, requires: true },
    quantity: { type: Number, requires: true },
     
})


module.exports=mongoose.model('Menu', menuSchema)