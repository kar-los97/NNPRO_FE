import {axios} from "../../../axiosConfig";

const basePath = "user";

export function apiUserLogin(data,callback,error){
    axios.post(basePath+"/login",data)
        .then(response=>callback(response.data))
        .catch((err)=>error(err))
}