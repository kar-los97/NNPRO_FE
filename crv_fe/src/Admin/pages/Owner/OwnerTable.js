import React, {useState} from "react";
import Button from "../../../Components/Fields/Button";
import {FiDelete, FiEdit} from "react-icons/all";
import CrvTable from "../../../Components/CrvTable";
import {apiRemoveOwner} from "./Actions";
import {showToast} from "../../../Components/CrvToast";
import {rightCheck} from "../../RightCheck";

const OwnerTable = ({initData}) => {
    let [deleting,setDeleting] = useState([]);
    const onDelete = (id)=>{
        setDeleting([...deleting,id]);
        apiRemoveOwner(id,(data)=>{
            showToast("success",`Majitel s id ${id} byl odstraněn.`);
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
        {Header: 'Jméno', accessor: 'firstName'},
        {Header: 'Příjmení', accessor: 'lastName'},
        {Header: 'Adresa', accessor: d=>(d.street+" "+d.numberOfHouse+", "+d.zipCode+" "+d.city)},
        {accessor: d => (d.cars.length), Header: 'Počet aut'},
        {
            id: 'options',
            Header: 'Možnosti',
            accessor: d => (<>
                <div className={"flex flex-row"}>
                    <div className={"mr-2"}><Button link={"/owner/detail/" + d.id} text={<FiEdit/>}/></div>
                    {(rightCheck("ROLE_Admin")||rightCheck("ROLE_Okres"))&&<div><Button disabled={deleting.some(v=>v===d.id)} loading={deleting.some(v=>v===d.id)} onClick={()=>onDelete(d.id)} text={<FiDelete/>}/></div>}
                </div>
            </>),
            filterable: false
        }
    ], []);

    const data = React.useMemo(() => initData, []);
    return <CrvTable data={data} columns={columns}/>
}
export default OwnerTable;