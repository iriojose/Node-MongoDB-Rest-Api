import conceptos from './model';
import * as respuestas from '../../errors';

export const get = async (query: any): Promise<any> => {
    try {
        let data = await conceptos.find((err: any, conceptos:any) => {
            if (err) return respuestas.InternalServerError;
        });
        
        let count = data.length;
        if (count <= 0) return respuestas.Empty;
        
        let totalCount = await conceptos.countDocuments((err:any,count:number) => {
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
        const concepto = new conceptos(data);
        await concepto.save((err:any,product:any) => {
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

export const getOne = async (id:any):Promise<any> => {
    try {
        let concepto = await conceptos.findById(id, (err:any) => {
            if (err) return respuestas.InternalServerError;
        });
        if (!concepto) return respuestas.ElementNotFound;

        let response = Object.assign({concepto});
        return { response, code: respuestas.Ok.code };
    }catch (error){
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Conceptos, error: ${error}`);
        return respuestas.InternalServerError;
    } 
}

export const deleteOne = async (id:any):Promise<any> => {
    try {   
        await conceptos.findByIdAndDelete(id, (err:any) => {
            if (err) return respuestas.InternalServerError;
        });
        let response = Object.assign({  message: respuestas.Deleted.message});
        return {code: respuestas.Deleted.code, response };
    }catch(error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Conceptos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

export const update = async (id:any,data:any):Promise<any> => {
    try {   
        let concepto = await conceptos.findByIdAndUpdate(id, (err:any) => {

        });

    }catch (error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Conceptos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}