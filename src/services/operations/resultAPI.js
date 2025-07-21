 import { apiConnector } from "../apiconnector";
import { storeResultEndPoint } from "../apis";
 
 

 export const captureResult = async(data) => {
    console.log("data in resultAPI operations" , data);

    try{
              const response = await apiConnector("POST", storeResultEndPoint.RESULTDATA_API , data);
    }
    catch(error)
    {
        console.log("error in capturing result in operations" , error);

    }

 }