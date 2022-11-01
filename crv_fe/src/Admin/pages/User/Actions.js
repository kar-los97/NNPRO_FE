import {axios} from "../../../axiosConfig";

const basePath = "user";

export const apiGetAllRoles=(callback,error)=>{
    axios.get(basePath+"/getAllRoles")
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiGetUserById=(userId,callback,error)=>{
    axios.get(basePath+"/getUser/"+userId)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiGetAllUsers=(callback,error)=>{
    axios.get(basePath+"/getAllUsers")
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiAddUser=(data,callback,error)=>{
    axios.post(basePath+"/addUser",data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiEditUser=(data,userId,callback,error)=>{
    axios.put(basePath+"/editUser/"+userId,data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiChangeUserPassword=(data,userId,callback,error)=>{
    axios.put(basePath+"/changeUserPassword/"+userId)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiRemoveUser=(userId,callback,error)=>{
    axios.delete(basePath+"/removeUser/"+userId)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}