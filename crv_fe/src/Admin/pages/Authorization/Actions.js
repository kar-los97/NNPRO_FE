import {axios} from "../../../axiosConfig";


export function apiUserLogin(data,callback,error){
    axios.post("api/admin/v1/login",data)
        .then(response=>callback(response.data.data))
        .catch((err)=>error(err))
}