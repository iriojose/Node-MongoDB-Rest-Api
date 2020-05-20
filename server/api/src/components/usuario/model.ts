import * as mongoose from "mongoose";

export const UsuarioSchema = new mongoose.Schema({
    nombre:{ type: String, required: true },
    apellido:{ type: String, required: true },
    login:{ type: String, required: true, unique:true},
    password:{ type: String, required: true },
    perfil_id:{ type:String || Number, required: true },
    email:{ type: String, required: true ,unique:true},
    tema:{ type: String, required: false ,default:null},
    app_ajax:{type: Number, required: false ,default:null},
    datagrid:{type: Number, required: false ,default:null},
    imagen:{type: String, required: false ,default:'default.png'},
    pool:{type: String, required: false ,default:null},
    caja_id:{type:String || Number, required: false ,default:null},
    vendedor_id:{type:String || Number, required: false ,default:null}
},{
    timestamps:true
});

const model = mongoose.model("usuario", UsuarioSchema,"usuario");

export default model;
