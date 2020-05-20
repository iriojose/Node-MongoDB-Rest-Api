import * as mongoose from "mongoose";

export const SubgruposSchema = new mongoose.Schema({
    nombre:{ type: String, required: true },
    grupos_id:{type:String || Number ,required:true},
    visualizar:{ type: String, required: false ,default:1},
    posicion:{ type: String, required: false,default:1 },
    imagen:{ type: String, required: false ,default:'default.png'},
},{
    timestamps:true
});

const model = mongoose.model("subgrupos", SubgruposSchema,"subgrupos");

export default model;