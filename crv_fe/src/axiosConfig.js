import axiosLib from "axios";
import CogoToast from "cogo-toast";


export const axios = axiosLib.create({
    baseURL: "http://localhost:8080",
    headers:{
        "Content-Type": "application/json"
    }
})

axios.interceptors.response.use(undefined, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem("ath-crv");
        CogoToast.warn("Nejste autorizovaný. Prosím přihlašte se znovu.")
        //useHistory().push("/login");
    }
    return Promise.reject(error);
})