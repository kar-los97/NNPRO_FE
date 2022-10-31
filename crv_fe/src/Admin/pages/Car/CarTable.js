import React from "react";
import Button from "../../../Components/Fields/Button";
import {FiDelete, FiEdit} from "react-icons/all";
import CogoToast from "cogo-toast";
import CrvTable from "../../../Components/CrvTable";
import {showToast} from "../../../Components/CrvToast";
import {apiRemoveOffice} from "../Office/Actions";

const CarTable = ({initData}) => {

    const columns = React.useMemo(() => [
        {Header: '#', accessor: 'id'},
        {Header: 'SPZ', accessor: 'spz'},
        {Header: 'VIN', accessor: 'vin'},
        {accessor: d => (<>{d.isInDeposit === true ? "ANO" : "NE"}</>), Header: 'V depositu'},
        {Header: 'Výrobce', accessor: 'manufacturer'},
        {Header: 'Typ', accessor: 'type'},
        {Header: 'Barva', accessor: 'color'},
        {accessor: d => (<>{formatYear(d.yearOfCreation)}</>), Header: 'Rok výroby'},
        {Header: 'Emisní standard', accessor: 'emissionStandard'},
        {Header: 'Výkon motoru', accessor: 'enginePower'},
        {Header: 'Točivý moment', accessor: 'torque'},
        {
            id: 'options',
            Header: 'Možnosti',
            accessor: d => (<>
                <div className={"flex flex-row"}>
                    <div className={"mr-2"}><Button link={"/car/detail/" + d.id} text={<FiEdit/>}/></div>
                </div>
            </>),
            filterable: false
        }
    ], []);

    const data = React.useMemo(() => initData, []);
    return <CrvTable data={data} columns={columns}/>
}
export default CarTable;

const formatYear = (dateTimeInString) => {
    if (dateTimeInString) {
        let date = new Date(dateTimeInString);
        return date.getFullYear();
    }
}