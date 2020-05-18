import mongoose from "mongoose";
import {URI,DATABASE} from './keys';

export class DB {
    private connectToDB(){
        mongoose.Promise = global.Promise;
        
        mongoose.connect(`${URI}${DATABASE}`,
            {
                useNewUrlParser: true , 
                useUnifiedTopology: true,
                useCreateIndex:true
            })
        .then(() => {
            console.log("conected DB")
        }).catch(err => console.log(err));
    }

    //connection to db
    public listen(){
        this.connectToDB();
    }
}