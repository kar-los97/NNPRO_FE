import React, {useEffect, useState} from "react";
import {apiGetAllRoles} from "../../Admin/pages/User/Actions";
import CrvSelectField from "../Fields/CrvSelectField";
import {Loader} from "../Loader";
import {apiGetOfficeAll} from "../../Admin/pages/Office/Actions";

const OfficeSelectField = () => {

    let [loading, setLoading] = useState(true);
    let [data, setData] = useState(null);

    useEffect(() => {
        init();
    }, [])

    const init = () => {
        apiGetOfficeAll((data) => {
            let opt = [];
            opt.push({"value":"NOT_SELECT","label":"---Nevybráno---"});
            data.map((item, index) => {
                opt.push({"value": item.id, "label": item.city})
            })
            setData(opt);
            setLoading(false);
        }, (error) => {
            setData(null);
            setLoading(false);
        })
    }

    return <CrvSelectField options={data} disabled={loading} loading={loading} label={"Pobočka: *"} placeHolder={"Pobočka"}
                           name={"branchOfficeId"}/>


}
export default OfficeSelectField;