import React, {useEffect, useState} from "react";
import Section from "../../../Components/Section";
import {useHistory} from "react-router-dom";
import {Loader} from "../../../Components/Loader";
import Button from "../../../Components/Fields/Button";
import {FaFileExport, FiPlus} from "react-icons/all";
import {apiGetOfficeAll} from "./Actions";
import {showToast} from "../../../Components/CrvToast";
import OfficeTable from "./OfficeTable";

const Office = ()=>{
    let [loading,setLoading] = useState(false);
    let [data,setData] = useState(null);

    const history = useHistory();

    useEffect(()=>{
        init();
    },[])

    const init = ()=>{
        setLoading(true);
        apiGetOfficeAll((data)=>{
            setData(data);
            setLoading(false);
        },(error)=>{
            showToast("error","Nepodařilo se načíst pobočky.");
            setLoading(false);
            history.push("/");
        })
    }

    const _renderBody = ()=>{
        if(loading) return <Loader text={"Načítám pobočky..."}/>
        if(!loading && data) return <OfficeTable initData={data}/>
        else return <></>;
    }

    return(
        <Section title={"Pobočky"} description={"Všechny dostupné pobočky"} right={
            <div className={"flex flex-row"}>
                <div className={"mr-2"}> <Button link={"/data"} text={<><FaFileExport className={"mr-2 mt-1"}/>Export/import </>}/></div>
                <Button text={<><FiPlus className={"mr-2 mt-1"}/>Přidat</>} link={"/branch/add"}/>
            </div>
        }>
            {_renderBody()}
        </Section>
    )
}
export default Office;