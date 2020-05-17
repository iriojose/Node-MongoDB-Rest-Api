import usuario from './model';
import * as respuestas from '../../errors';
import {encrypt} from '../../helpers/authentication';

export const get = async (query: any): Promise<any> => {
    try {
        let data = await usuario.find((err: any, response:any) => {
            if (err) return respuestas.InternalServerError;
        });
        
        let count = data.length;
        if (count <= 0) return respuestas.Empty;
        
        let totalCount = await usuario.countDocuments((err:any,count:number) => {
            if (err) return respuestas.InternalServerError;
        });

        let response = Object.assign({totalCount,count,data});
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Conceptos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

export const created = async (body:any):Promise<any> => {
    try {
        let {data} = body;
        data = typeof data == 'string' ? JSON.parse(data) : data;
        
        //verifica si el email ya esta siendo usado
        usuario.findOne({email:data.email}, (err:any) => {
            if (err) return respuestas.InternalServerError;
            else return { message: "this email already in use."}
        });
        
        data.password = await encrypt(data.password);
        let newUsuario = new usuario(data);

        await newUsuario.save((err:any,response:any) => {
            if (err) return respuestas.InternalServerError;
        });

        let response = { message: respuestas.Created.message ,data:data};
        return { response, code: respuestas.Created.code };
    }catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Usuario, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

export const getOne = async (id:any):Promise<any> => {
    try {
        let concepto = await usuario.findById(id, (err:any) => {
            if (err) return respuestas.InternalServerError;
        });
        if (!concepto) return respuestas.ElementNotFound;

        let response = Object.assign({concepto});
        return { response, code: respuestas.Ok.code };
    }catch (error){
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Usuario, error: ${error}`);
        return respuestas.InternalServerError;
    } 
}

export const deleteOne = async (id:any):Promise<any> => {
    try {   
        await usuario.findByIdAndDelete(id, (err:any) => {
            if (err) return respuestas.InternalServerError;
        });
        let response = Object.assign({  message: respuestas.Deleted.message});
        return {code: respuestas.Deleted.code, response };
    }catch(error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Usuario, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

export const update = async (id:any,data:any):Promise<any> => {
    try {   
        let Usuario = await usuario.findByIdAndUpdate({"_id":id},data,(err:any,response:any) => {
            if (err) return respuestas.InternalServerError;
        });
        let response = Object.assign({ message: respuestas.Update.message,Usuario});
        return { response, code: respuestas.Update.code };
    }catch (error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Usuario, error: ${error}`);
        return respuestas.InternalServerError;
    }
}