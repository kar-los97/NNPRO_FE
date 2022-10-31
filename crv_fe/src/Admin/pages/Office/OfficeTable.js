import React, {useState} from "react";
import Button from "../../../Components/Fields/Button";
import {FiDelete, FiEdit} from "react-icons/all";
import CrvTable from "../../../Components/CrvTable";
import {showToast} from "../../../Components/CrvToast";
import {apiRemoveOffice} from "./Actions";

const OfficeTable = ({initData}) => {

    let [deleting,setDeleting] = useState([]);
    const onDelete = (id)=>{
        setDeleting([...deleting,id]);
        apiRemoveOffice(id,(data)=>{
            showToast("success",`Pobočka s id ${id} byla odstraněna.`);
            let array = [...deleting];
            let index = array.indexOf(id);
            if (index !== -1) {
                array.splice(index, 1);
                setDeleting(array);
            }
        },(error)=>{
            showToast("error","Nepodařilo se odstranit pobočku");
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
        {Header: 'Kraj', accessor: 'region'},
        {Header: 'Okres', accessor: 'district'},
        {Header: 'Město', accessor: 'city'},
        {accessor: d => (d.users.length), Header: 'Počet uživatelů'},
        {accessor: d => (d.cars.length), Header: 'Počet aut'},
        {
            id: 'options',
            Header: 'Možnosti',
            accessor: d => (<>
                <div className={"flex flex-row"}>
                    <div className={"mr-2"}><Button link={"/branch/detail/" + d.id} text={<FiEdit/>}/></div>
                    <div><Button disabled={deleting.some(v=>v===d.id)} loading={deleting.some(v=>v===d.id)} onClick={()=>onDelete(d.id)} text={<FiDelete/>}/></div>
                </div>
            </>),
            filterable: false
        }
    ], []);

    const data = React.useMemo(() => initData, []);
    return <CrvTable data={data} columns={columns}/>
}
export default OfficeTable;