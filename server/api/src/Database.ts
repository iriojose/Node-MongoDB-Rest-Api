import mongoose from "mongoose";
import {URI,DATABASE} from './keys';

export class DB {
    private connectToDB(){
        let uri = URI;
        let database = DATABASE;
        mongoose.Promise = global.Promise;
        
        mongoose.connect(`${uri}+${database}`,{useNewUrlParser: true , useUnifiedTopology: true})
        .then(() => {
            console.log("conected DB")
        }).catch(err => console.log(err));
    }

    public listen(){
        this.connectToDB();
    }
}