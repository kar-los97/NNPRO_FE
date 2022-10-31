import React, {useState} from "react";
import CrvTable from "../../../Components/CrvTable";
import Moment from "moment";

const OwnerHistoryTable = ({initData}) => {
    const formatDate = (dateTimeInString) => {
        if (dateTimeInString) {

            let date = new Date(dateTimeInString);
            let moment = new Moment(date);
            return moment.format("YYYY-MM-DD");
        }
    }

    const columns = React.useMemo(() => [
        {Header: '#', accessor: 'id'},
        {Header: 'Jméno', accessor: 'firstName'},
        {Header: 'Příjmení', accessor: 'lastName'},
        {Header: 'Adresa', accessor: d=>(d.street+" "+d.numberOfHouse+", "+d.zipCode+" "+d.city)},
        {Header: 'Začátek registrace', accessor: d=>(formatDate(d.startOfSignUp))},
        {Header: 'Konec registrace', accessor: d=>(formatDate(d.endOfSignUp))},
    ], []);

    const data = React.useMemo(() => initData, []);
    return <CrvTable data={data} columns={columns}/>
}
export default OwnerHistoryTable;