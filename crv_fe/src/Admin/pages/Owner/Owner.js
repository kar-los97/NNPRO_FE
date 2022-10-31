import React, {useEffect, useState} from "react";
import Section from "../../../Components/Section";
import {useHistory} from "react-router-dom";
import {apiGetAllCar} from "../Car/Actions";
import {showToast} from "../../../Components/CrvToast";
import {Loader} from "../../../Components/Loader";
import CarTable from "../Car/CarTable";
import Button from "../../../Components/Fields/Button";
import {FiPlus} from "react-icons/all";
import {apiGetAllOwner} from "./Actions";
import OwnerTable from "./OwnerTable";

const Owner = () =>{
    let [loading,setLoading] = useState(false);
    let [data,setData] = useState(null);

    const history = useHistory();

    useEffect(()=>{
        init();
    },[])

    const init = ()=>{
        setLoading(true);
        apiGetAllOwner((data)=>{
            setData(data);
            setLoading(false);
        },(error)=>{
            showToast("error","Nepodařilo se načíst vozidla.");
            setLoading(false);
            history.push("/");
        })
    }

    const _renderBody = ()=>{
        if(loading) return <Loader text={"Načítám vozidla..."}/>
        if(!loading && data) return <OwnerTable initData={data}/>
        else return <></>;
    }

    return (
        <Section title={"Majitelé"} description={"Výpis všech evidovaných majitelů"} right={<Button text={<><FiPlus className={"mr-2 mt-1"}/>Přidat</>} link={"/owner/add"}/>}>
            {_renderBody()}
        </Section>
    )
}
export default Owner;