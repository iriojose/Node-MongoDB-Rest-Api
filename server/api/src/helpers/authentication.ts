import {Request,Response,NextFunction} from 'express';
import model from '../components/usuario/model';
import bcrypt from 'bcryptjs';

export async function validar(req:Request,res:Response,next:NextFunction){
    console.log(`[DATE] ${new Date()}`);
    let head:string = req.headers['x-access-control'] as string ;

    if (head){
        let header = JSON.parse(head);
        let masterUser:any = await model.findOne({login:header.user});
        if (!masterUser) return res.status(400).json({message: "Datos no validos 1"});
        let valido = await bcrypt.compare(header.password,masterUser.password);

        if(valido){
            next();
        }else{
            return res.status(400).json({message: "Datos no validos 1"});
        } 
    }else {
        return res.status(400).json({message: "Datos no validos 2"});
    }
}

export async function encrypt(password:any){
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

export async function compare(password:any,othePassword:any){
    return await bcrypt.compare(password,othePassword);
}