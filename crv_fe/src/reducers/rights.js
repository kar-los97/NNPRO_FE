export default function rights(state={
    role: null
},action){
    switch (action.type){
        case "SET_RIGHTS":
            return {...state,role:action.role}
        default:
            return state;
    }
}