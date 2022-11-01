import React, {useEffect, useState} from "react";
import Section from "../../../Components/Section";
import Button from "../../../Components/Fields/Button";
import {FiCheck, FiPlus} from "react-icons/all";
import CarTable from "./CarTable";
import {apiGetAllCar} from "./Actions";
import {useHistory} from "react-router-dom";
import {Loader} from "../../../Components/Loader";
import {showToast} from "../../../Components/CrvToast";
import {CarCheckModal} from "./CarCheckModal";
import {rightCheck} from "../../RightCheck";

const Car = () =>{
    let [loading,setLoading] = useState(false);
    let [data,setData] = useState(null);

    const history = useHistory();

    useEffect(()=>{
        init();
    },[])

    const init = ()=>{
        setLoading(true);
        apiGetAllCar((data)=>{
            setData(filterData(data));
            setLoading(false);
        },(error)=>{
            showToast("error","Nepodařilo se načíst vozidla.");
            setLoading(false);
            history.push("/");
        })
    }

    const filterData = (data)=>{
        if(rightCheck("ROLE_Okres")){
            let newData = [];
            let branchId = parseInt(localStorage.getItem("branch-crv"));
            data.map((item,index)=>{
                if(item.branchOffice && item.branchOffice.id===branchId){
                    newData.push(item);
                }
            })
            return newData;
        }else{
            return data;
        }

    }

    const _renderBody = ()=>{
        if(loading) return <Loader text={"Načítám vozidla..."}/>
        if(!loading && data) return <CarTable initData={data}/>
        else return <></>;
    }

    return (
        <Section title={"Auta"} description={"Výpis aut z registru"} right={
            <div className={"flex flex-row"}>
                <div className={"mr-2"}> <CarCheckModal/></div>
                {(rightCheck("ROLE_Admin")||rightCheck("ROLE_Okres"))&&<Button text={<><FiPlus className={"mr-2 mt-1"}/>Přidat</>} link={"/car/add"}/>}
            </div>
        }>
            {_renderBody()}
        </Section>
    )

}
export default Car;