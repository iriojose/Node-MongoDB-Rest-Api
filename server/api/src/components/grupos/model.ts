import * as mongoose from "mongoose";

export const GruposSchema = new mongoose.Schema({
    nombre:{ type: String, required: true },
    visualizar:{ type: String, required: false ,default:1},
    posicion:{ type: String, required: false,default:1 },
    imagen:{ type: String, required: true ,default:'default.png'},
},{
    timestamps:true
});

const model = mongoose.model("grupos", GruposSchema,"grupos");

export default model;