const mongoose=require("mongoose")
const {Schema}=mongoose


const OrdersSchema = new Schema({
    userId: String,
    symbol: String,
    name: String,
    qty: Number,
    price: Number,
    mode:String,
});

module.exports = {OrdersSchema};
