import {axios} from "../../../axiosConfig";

const basePath = "branchOffice";

export function apiGetOfficeById(id,callback,error){
    axios.get(basePath+"/getOffice/"+id)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiGetOfficeAll=(callback,error)=>{
    axios.get(basePath+"/getAllOffices")
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiExportData(callback,error){
    axios.get(basePath+"/exportData")
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiAddUserToOffice(data,callback,error){
    axios.post(basePath+"/addUserToOffice",data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiAddOffice(data,callback,error){
    axios.post(basePath+"/addOffice",data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiImportData(data,callback,error){
    axios.put(basePath+"/importData",data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiEditOffice(data,officeId,callback,error){
    axios.put(basePath+"/editOffice/"+officeId,data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiRemoveOffice(officeId,callback,error){
    axios.delete(basePath+"/removeOffice/"+officeId)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}
