export function rightCheck(right){
    let storageRole = localStorage.getItem('role-crv')
    let role = storageRole.split(";");
    const exist = role.some(r=>(r===right));
    return !!exist;
}