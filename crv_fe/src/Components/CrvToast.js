import CogoToast from "cogo-toast";

export const showToast=(type,message)=>{
    let options = {position:"top-left"}
    switch (type){
        case "error":
            CogoToast.error(message,options);
            break;
        case "success":
            CogoToast.success(message,options);
            break;
        case "info":
            CogoToast.info(message,options);
            break;
        case "warn":
            CogoToast.warn(message,options);
            break;
    }
}