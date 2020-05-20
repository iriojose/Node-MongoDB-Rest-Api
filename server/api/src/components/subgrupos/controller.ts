import model from './model';
import * as respuestas from '../../errors';

//get all subgroups
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
        console.log(`Error en el controlador Subgrupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//create new subgroup
export const created = async (body:any):Promise<any> => {
    try {
        let {data} = body;
        data = typeof data == 'string' ? JSON.parse(data) : data;
        let subgrupo = new model(data);
        await subgrupo.save((err:any,response:any) => {
            if (err) return respuestas.InternalServerError;
            else subgrupo = response;
        });

        let response = { message: respuestas.Created.message ,data:subgrupo};
        return { response, code: respuestas.Created.code };
    }catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Subgrupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//get one subgroup
export const getOne = async (id:any):Promise<any> => {
    try {
        let subgrupo = await model.findById(id, (err:any) => {
            if (err) return respuestas.InternalServerError;
        });
        if (!subgrupo) return respuestas.ElementNotFound;

        let response = Object.assign({subgrupo});
        return { response, code: respuestas.Ok.code };
    }catch (error){
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Subgrupos, error: ${error}`);
        return respuestas.InternalServerError;
    } 
}

//delete one subgroup
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
        console.log(`Error en el controlador Subgrupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//update one subgroup
export const update = async (id:any,data:any):Promise<any> => {
    try {   
        let subgrupo = await model.findByIdAndUpdate({"_id":id},data,(err:any,response:any) => {
            if (err) return respuestas.InternalServerError;
        });

        if (!subgrupo) return respuestas.ElementNotFound;

        let response = Object.assign({ message: respuestas.Update.message,subgrupo});
        return { response, code: respuestas.Update.code };
    }catch (error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Subgrupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}