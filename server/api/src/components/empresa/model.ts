import * as mongoose from "mongoose";

export const EmpresaSchema = new mongoose.Schema({

    rif:{type:String,required:true,unique:true},
    nombre:{type:String,required:true},
    razon_social:{type:String,required:false,default:null},
    fecha_registro:{type:Date,required:false,default:Date.now},
    direccion:{type:String,required:true},
    telefono1:{type:String,required:true},
    telefono2:{type:String,required:false,default:null},
    telefono3:{type:String,required:false,default:null},
    pag_web:{type:String,required:false,default:null},
    correo_electronico:{type:String,required:true},
    correo_electronico2:{type:String,required:false,default:null},
    twitter:{type:String,required:false,default:null},
    facebook:{type:String,required:false,default:null},
    instagram:{type:String,required:false,default:null},
    imagen:{ type: String, required: false ,default:'default.png'},
    firma_digital:{type:String,required:false,default:null},
    licencia_licores:{type:Boolean,required:false,default:false},
    nota:{type:String,required:false,default:null},
    modelo:{type:Number,required:false,default:1},
    serial_disk:{type:String,required:false,default:null},
    
},{
    timestamps:true
});

const model = mongoose.model("empresa", EmpresaSchema,"empresa");

export default model;