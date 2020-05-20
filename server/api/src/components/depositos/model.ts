import * as mongoose from "mongoose";

export const DepositoSchema = new mongoose.Schema({
    nombre:{ type: String, required: true },
    usuario_id:{type: String || Number, required: false , default:null},
},{
    timestamps:true
});

const model = mongoose.model("depositos", DepositoSchema,"depositos");

export default model;