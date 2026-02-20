const mongoose=require("mongoose")
const {Schema}=mongoose

const HoldingsSchema = new Schema({
    userId: String,
    symbol:String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
});

module.exports = {HoldingsSchema}
