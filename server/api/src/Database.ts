import mongoose from "mongoose";
import {URI,DATABASE} from './keys';

export class DB {
    private connectToDB(){
        mongoose.Promise = global.Promise;
        
        mongoose.connect(`${URI}${DATABASE}`,{useNewUrlParser: true , useUnifiedTopology: true})
        .then(() => {
            console.log("conected DB")
        }).catch(err => console.log(err));
    }

    public listen(){
        this.connectToDB();
    }
}