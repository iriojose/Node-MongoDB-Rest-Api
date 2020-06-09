import model from './model';
import * as respuestas from '../../errors';

//get all subgroups
export const get = async (query: any): Promise<any> => {
    try {
        
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Subgrupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//create new subgroup
export const created = async (body:any):Promise<any> => {
    try {
        
    }catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Subgrupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//get one subgroup
export const getOne = async (id:any):Promise<any> => {
    try {
       
    }catch (error){
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Subgrupos, error: ${error}`);
        return respuestas.InternalServerError;
    } 
}

//delete one subgroup
export const deleteOne = async (id:any):Promise<any> => {
    try {   
        
    }catch(error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Subgrupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

//update one subgroup
export const update = async (id:any,data:any):Promise<any> => {
    try {   
        
    }catch (error) {
        if (error.message === 'DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador Subgrupos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}