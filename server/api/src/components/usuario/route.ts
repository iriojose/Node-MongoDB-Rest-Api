import  { Router,Request,Response } from 'express';
import {validar} from '../../helpers/authentication';
import * as controller  from './controller';
import { InternalServerError } from '../../errors';
const router = Router();

router.get("/",validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.get(req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.
            status(InternalServerError.code).
            json({message:InternalServerError.message});
    }
});

router.post("/", async (req:Request, res:Response):Promise<Response> => {
    try {
        let { message, response, code } = await controller.created(req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.
            status(InternalServerError.code).
            json({message:InternalServerError.message});
    }
});

router.get("/:id",validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let { message, response, code } = await controller.getOne(id);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.
            status(InternalServerError.code).
            json({message:InternalServerError.message});
    }
});

router.delete("/:id",validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params ;
    try {
        let { message, response, code } = await controller.deleteOne(id);
        return res.status(code).json(message || response);
    }catch (error) {
        console.log(error);
        return res.
            status(InternalServerError.code).
            json({message:InternalServerError.message});
    }
});

router.post("/:id",validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let {id} = req.params;
        let {data} = req.body;
        let { message, response, code } = await controller.update(id,data);
        return res.status(code).json(message || response);
    }catch(error) {
        console.log(error);
        return res.
            status(InternalServerError.code).
            json({message:InternalServerError.message});
    }
});

export default router;