import React from "react";
import Button from "../../../Components/Fields/Button";
import {FiDelete, FiEdit} from "react-icons/all";
import CogoToast from "cogo-toast";
import CrvTable from "../../../Components/CrvTable";
import {showToast} from "../../../Components/CrvToast";

const OfficeTable = ({initData}) => {
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
                    <div className={"mr-2"}><Button link={"/car/detail/" + d.id} text={<FiEdit/>}/></div>
                    <div><Button onClick={() => {
                        showToast("info","DELETE OFFICE.")
                    }} text={<FiDelete/>}/></div>
                </div>
            </>),
            filterable: false
        }
    ], []);

    const data = React.useMemo(() => initData, []);
    return <CrvTable data={data} columns={columns}/>
}
export default OfficeTable;