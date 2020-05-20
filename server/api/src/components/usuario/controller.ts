import model from './model';
import * as respuestas from '../../errors';
import {encrypt} from '../../helpers/authentication';

//get all users
export const get = async (query: any): Promise<any> => {
    try {
        let data = await model.find((err: any, response:any) => {
            if (err) return respuestas.InternalServerError;
        });
        
        let count = data.length;
        if (count <= 0) return respuestas.Empty;
        
        let totalCount = await model.countDocuments((err:any,count:number) => {
            if (err) return respuestas.InternalServerError;
        });

        let response = Object.assign({totalCount,count,data});
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Usuario, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//created new user (expected sign in)
export const created = async (body:any):Promise<any> => {
    try {
        let {data} = body;
        data = typeof data == 'string' ? JSON.parse(data) : data;
        
        //check if the email is in use
        model.findOne({email:data.email}, (err:any) => {
            if (err) return respuestas.InternalServerError;
            else return { message: "this email already in use."}
        });
        
        //encript password 
        data.password = await encrypt(data.password);
        let usuario = new model(data);

        await usuario.save((err:any,response:any) => {
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

//get one user
export const getOne = async (id:any):Promise<any> => {
    try {
        let data = await model.findById(id, (err:any) => {
            if (err) return respuestas.InternalServerError;
        });
        if (!data) return respuestas.ElementNotFound;

        let response = Object.assign({data});
        return { response, code: respuestas.Ok.code };
    }catch (error){
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Usuario, error: ${error}`);
        return respuestas.InternalServerError;
    } 
}

//delete one user
export const deleteOne = async (id:any):Promise<any> => {
    try {   
        await model.findByIdAndDelete(id, (err:any) => {
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

//update one user
export const update = async (id:any,data:any):Promise<any> => {
    try {   
        let usuario = await model.findByIdAndUpdate({"_id":id},data,(err:any,response:any) => {
            if (err) return respuestas.InternalServerError;
        });

        if (!usuario) return respuestas.ElementNotFound;

        let response = Object.assign({ message: respuestas.Update.message,usuario});
        return { response, code: respuestas.Update.code };
    }catch (error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Usuario, error: ${error}`);
        return respuestas.InternalServerError;
    }
}