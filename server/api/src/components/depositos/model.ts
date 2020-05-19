import * as mongoose from "mongoose";

export const DepositoSchema = new mongoose.Schema({
    nombre:{ type: String, required: true },
    usuario_id:{type: Number, required: false },
},{
    timestamps:true
});

const model = mongoose.model("depositos", DepositoSchema,"depositos");

export default model;