import {axios} from "../../../axiosConfig";
const basePath = "car"
export function apiGetCarById(id,callback,error){
    axios.get(basePath+"/getCar/"+id)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiGetCarBySpz(spz,callback,error){
    axios.get(basePath+"/getCarBySpz/"+spz)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiGetCarByVin(vin,callback,error){
    axios.get(basePath+"/getCarByVin/"+vin)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export const apiGetAllCar=(callback,error)=>{
    axios.get(basePath+"/getAllCar")
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiIsCarStolenBySpz(spz,callback,error){
    axios.get(basePath+"/isCarStolenBySpz/"+spz)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiIsCarStolenByVin(vin,callback,error){
    axios.get(basePath+"/isCarStolenByVin/"+vin)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiAddCar(data,callback,error){
    axios.post(basePath+"/addCar",data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiSignCar(data,callback,error){
    axios.post(basePath+"/signInCar",data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiSignCarToOwner(data,ownerId,callback,error){
    axios.post(basePath+"/signInCar/"+ownerId,data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiSignOutCar(data,callback,error){
    axios.put(basePath+"/signOutCar",data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiRemoveCarFromOffice(data,officeId,callback,error){
    axios.put(basePath+"/removeCarFromOffice/"+officeId,data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiPutCarToDeposit(carId,callback,error){
    axios.put(basePath+"/putToDeposit/"+carId)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiEditCar(data,carId,callback,error){
    axios.put(basePath+"/editCar/"+carId)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiAddCarToOffice(data,callback,error){
    axios.put(basePath+"/addCarToOffice",data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}

export function apiEditCarInOffice(data,callback,error){
    axios.put(basePath+"/editCarInOffice",data)
        .then((response)=>callback(response.data))
        .catch((err)=>error(err))
}