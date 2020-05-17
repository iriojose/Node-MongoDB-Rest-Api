import * as mongoose from "mongoose";

export const UsuarioSchema = new mongoose.Schema({
    nombre:{ type: String, required: true },
    apellido:{ type: String, required: true },
    login:{ type: String, required: true },
    password:{ type: String, required: true },
    perfil_id:{ type: Number, required: true },
    email:{ type: String, required: true ,unique:true},
    tema:{ type: String, required: false },
    app_ajax:{type: Number, required: false },
    datagrid:{type: Number, required: false },
    imagen:{type: String, required: false },
    pool:{type: String, required: false },
    caja_id:{type: Number, required: false },
    vendedor_id:{type: Number, required: false }
},{
    timestamps:true
});

const model = mongoose.model("usuario", UsuarioSchema,"usuario");

export default model;
