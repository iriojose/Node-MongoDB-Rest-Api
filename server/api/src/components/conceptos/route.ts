import  { Router,Request,Response } from 'express';
import Conceptos from './model';
const router = Router();


router.get("/", (req:Request, res:Response) => {
    let conceptos = Conceptos.find((err: any, conceptos: any) => {
        if (err) {
            return res.status(500).json({message:"error 500"});
        } else {
            return res.status(200).json({message:"all conceptos",conceptos:conceptos});
        }
    });
});

router.post("/", (req:Request, res:Response) => {
    try {
        //let { message, response, code } = await controller.get(req.query);
        return res.status(200).json({message:"created"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"error 500"});
    }
});

/*export let addConcept = (req: Request, res: Response) => {
  res.send("Returns one book");
};*/

export default router;