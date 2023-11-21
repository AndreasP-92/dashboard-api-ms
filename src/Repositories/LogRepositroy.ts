import { ObjectToReturn } from "../Models/Types/ObjectToReturnModel.js";
import LogModel from "../Models/DatabaseModels/LogModel.js"

class LogRepository {
    shortMessage: string;
    fullMessage: string;

    objectToReturn = new ObjectToReturn({}, true, "", 200);


    constructor(){

    }

    async insertLog(){
        const log = {
            shortMessage : this.shortMessage?.toString(),
            fullMessage : this.fullMessage?.toString()
        }

        try{
            const data = await LogModel.create(log);
            this.objectToReturn.object = data;

            return this.objectToReturn;

        }catch(error){
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to insert log" + error;
            this.objectToReturn.status = 405;

            return this.objectToReturn;
        }
    }
}

export default LogRepository;