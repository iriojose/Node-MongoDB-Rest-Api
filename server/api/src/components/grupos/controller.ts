import model from './model';
import * as respuestas from '../../errors';

//get all groups
export const get = async (query: any): Promise<any> => {
    try {
        let data = await model.find((err: any) => {
            if (err) return respuestas.InternalServerError;
        }); 
        
        let count = data.length;
        if (count <= 0) return respuestas.Empty;
        
        let totalCount = await model.countDocuments((err:any) => {
            if (err) return respuestas.InternalServerError;
        });

        let response = Object.assign({totalCount,count,data});
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Grupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//create new group
export const created = async (body:any):Promise<any> => {
    try {
        let {data} = body;
        data = typeof data == 'string' ? JSON.parse(data) : data;
        let grupo = new model(data);
        await grupo.save((err:any,response:any) => {
            if (err) return respuestas.InternalServerError;
            else grupo = response;
        });

        let response = { message: respuestas.Created.message ,data:grupo};
        return { response, code: respuestas.Created.code };
    }catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Grupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//get one group
export const getOne = async (id:any):Promise<any> => {
    try {
        let grupo = await model.findById(id, (err:any) => {
            if (err) return respuestas.InternalServerError;
        });
        if (!grupo) return respuestas.ElementNotFound;

        let response = Object.assign({grupo});
        return { response, code: respuestas.Ok.code };
    }catch (error){
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Grupos, error: ${error}`);
        return respuestas.InternalServerError;
    } 
}

//delete one group
export const deleteOne = async (id:any):Promise<any> => {
    try {   
        let data = null;
        await model.findByIdAndDelete(id, (err:any,response:any) => {
            if (err) return respuestas.InternalServerError;
            else data = response;
        });

        if (!data) return respuestas.ElementNotFound;

        let response = Object.assign({  message: respuestas.Deleted.message});
        return {code: respuestas.Deleted.code, response };
    }catch(error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Grupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//update one group
export const update = async (id:any,data:any):Promise<any> => {
    try {   
        let grupo = await model.findByIdAndUpdate({"_id":id},data,(err:any) => {
            if (err) return respuestas.InternalServerError;
        });

        if (!grupo) return respuestas.ElementNotFound;

        let response = Object.assign({ message: respuestas.Update.message,grupo});
        return { response, code: respuestas.Update.code };
    }catch (error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Grupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//get subgroups
export const getSubgroups = async (id:any,query:any): Promise<any> => {
    try {
        let data = await model.findById(id).
        
        
        let count = data.length;
        if (count <= 0) return respuestas.Empty;
        
        let totalCount = await model.countDocuments((err:any) => {
            if (err) return respuestas.InternalServerError;
        });

        let response = Object.assign({totalCount,count,data});
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Grupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}