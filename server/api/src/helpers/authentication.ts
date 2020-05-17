import {Request,Response,NextFunction} from 'express';
import bcrypt from 'bcryptjs';

export async function validar(req:Request,res:Response,next:NextFunction){
    console.log(`[DATE] ${new Date()}`);
    let head:string = req.headers['x-access-control'] as string ;

    if (head){
        let headerObject = JSON.parse(head);
        let masterUser = null; //await users.getUser(headerObject.user);

        if(masterUser){
            //req.userId = masterUser.id;
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