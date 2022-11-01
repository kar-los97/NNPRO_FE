import React, {useState} from "react";
import Button from "../../../Components/Fields/Button";
import {FiDelete, FiEdit} from "react-icons/all";
import CrvTable from "../../../Components/CrvTable";
import {showToast} from "../../../Components/CrvToast";
import {apiRemoveUser} from "./Actions";
import {rightCheck} from "../../RightCheck";

const UserTable = ({initData}) => {
    let [deleting,setDeleting] = useState([]);
    const onDelete = (id)=>{
        setDeleting([...deleting,id]);
        apiRemoveUser(id,(data)=>{
            showToast("success",`Uživatel s id ${id} byl odstraněn.`);
            let array = [...deleting];
            let index = array.indexOf(id);
            if (index !== -1) {
                array.splice(index, 1);
                setDeleting(array);
            }
        },(error)=>{
            showToast("error","Nepodařilo se odstranit uživatele");
            let array = [...deleting];
            let index = array.indexOf(id);
            if (index !== -1) {
                array.splice(index, 1);
                setDeleting(array);
            }
        })
    }

    const columns = React.useMemo(() => [
        {Header: '#', accessor: 'id'},
        {Header: 'Přihlašovací jméno', accessor: 'username'},
        {Header: 'Pozice', accessor: 'jobPosition'},
        {accessor: d => (d.role.description), Header: 'Role'},
        {Header: 'Okres', accessor: d=>(d.branchOfficeDto?d.branchOfficeDto.district:"-")},
        {
            id: 'options',
            Header: 'Možnosti',
            accessor: d => (<>
                <div className={"flex flex-row"}>
                    <div className={"mr-2"}><Button link={"/user/detail/" + d.id} text={<FiEdit/>}/></div>
                    {(rightCheck("ROLE_Admin")||rightCheck("ROLE_Okres"))&&<div><Button disabled={deleting.some(v=>v===d.id)} loading={deleting.some(v=>v===d.id)} onClick={()=>onDelete(d.id)} text={<FiDelete/>}/></div>}
                </div>
            </>),
            filterable: false
        }
    ], []);

    const data = React.useMemo(() => initData, []);
    return <CrvTable data={data} columns={columns}/>
}
export default UserTable;
