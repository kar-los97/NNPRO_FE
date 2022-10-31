import React, {useEffect, useState} from "react";
import {apiGetAllRoles} from "../../Admin/pages/User/Actions";
import CrvSelectField from "../Fields/CrvSelectField";
import {Loader} from "../Loader";

const RoleSelectField = () => {

    let [loading, setLoading] = useState(true);
    let [data, setData] = useState(null);

    useEffect(() => {
        init();
    }, [])

    const init = () => {
        apiGetAllRoles((data) => {
            let opt = [];
            opt.push({"value":"NOT_SELECT","label":"---Nevybráno---"});
            data.map((item, index) => {
                opt.push({"value": item.id, "label": item.description})
            })
            setData(opt);
            setLoading(false);
        }, (error) => {
            setData(null);
            setLoading(false);
        })
    }

    return <CrvSelectField options={data} disabled={loading} loading={loading} label={"Role: *"} placeHolder={"Role"}
                           name={"role"}/>


}
export default RoleSelectField;