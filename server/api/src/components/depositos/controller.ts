import model from './model';
import * as respuestas from '../../errors';

//get all deposits
export const get = async (query: any): Promise<any> => {
    try {
        //let { fields, limit, offset, order} = query;
        
        let data = await model.find((err: any, response:any) => {
            if (err) return respuestas.InternalServerError;
        }).sort({ _id: -1 });
        
        let count = data.length;
        if (count <= 0) return respuestas.Empty;
        
        let totalCount = await model.countDocuments((err:any,count:number) => {
            if (err) return respuestas.InternalServerError;
        });

        let response = Object.assign({totalCount,count,data});
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Depositos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//create new deposit
export const created = async (body:any):Promise<any> => {
    try {
        let {data} = body;
        data = typeof data == 'string' ? JSON.parse(data) : data;
        const deposito = new model(data);
        await deposito.save((err:any,response:any) => {
            if (err) return respuestas.InternalServerError;
        });

        let response = { message: respuestas.Created.message ,data:data};
        return { response, code: respuestas.Created.code };
    }catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Conceptos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//get one deposit
export const getOne = async (id:any):Promise<any> => {
    try {
        let deposito = await model.findById(id, (err:any) => {
            if (err) return respuestas.InternalServerError;
        });
        if (!deposito) return respuestas.ElementNotFound;

        let response = Object.assign({deposito});
        return { response, code: respuestas.Ok.code };
    }catch (error){
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Depositos, error: ${error}`);
        return respuestas.InternalServerError;
    } 
}

//delete one deposit
export const deleteOne = async (id:any):Promise<any> => {
    try {   
        await model.findByIdAndDelete(id, (err:any) => {
            if (err) return respuestas.InternalServerError;
        });
        let response = Object.assign({  message: respuestas.Deleted.message});
        return {code: respuestas.Deleted.code, response };
    }catch(error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Depositos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//update one deposits
export const update = async (id:any,data:any):Promise<any> => {
    try {   
        let deposito = await model.findByIdAndUpdate({"_id":id},data,(err:any,response:any) => {
            if (err) return respuestas.InternalServerError;
        });
        
        if (!deposito) return respuestas.ElementNotFound;

        let response = Object.assign({ message: respuestas.Update.message,deposito});
        return { response, code: respuestas.Update.code };
    }catch (error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Depositos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}