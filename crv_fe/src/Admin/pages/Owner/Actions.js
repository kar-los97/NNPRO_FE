import {axios} from "../../../axiosConfig";

const basePath = "owner";

export const apiGetOwnerById=(ownerId,callback,error)=>{
    axios.get(basePath+"/getOwner/"+ownerId)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiGetAllOwner=(callback,error)=>{
    axios.get(basePath+"/getAllOwner")
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiAddOwner=(data,callback,error)=>{
    axios.post(basePath+"/addOwner",data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiEditOwner=(data,ownerId,callback,error)=>{
    axios.put(basePath+"/editOwner/"+ownerId,data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiRemoveOwner=(ownerId,callback,error)=>{
    axios.delete(basePath+"/removeOwner/"+ownerId)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}