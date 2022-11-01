import React, {useEffect, useState} from "react";
import Section from "../../../Components/Section";
import {apiGetAllUsers} from "./Actions";
import {Loader} from "../../../Components/Loader";
import CarTable from "../Car/CarTable";
import Button from "../../../Components/Fields/Button";
import {FiPlus} from "react-icons/all";
import CogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
import UserTable from "./UserTable";
import {rightCheck} from "../../RightCheck";

const User = ()=>{
    let [loading,setLoading] = useState(false);
    let [data,setData] = useState(null);

    const history = useHistory();

    useEffect(()=>{
        init();
    },[])

    const init = () =>{
        apiGetAllUsers((data)=>{
            setData(filterData(data));
            setLoading(false);
        },(error)=>{
            CogoToast.error("Nepodařilo se načíst uživatele.");
            setLoading(false);
            history.push("/");
        })
    }

    const filterData = (data)=>{
        if(rightCheck("ROLE_Okres")){
            let newData = [];
            let branchId = parseInt(localStorage.getItem("branch-crv"));
            data.map((item,index)=>{
                if(item.branchOfficeDto && item.branchOfficeDto.id===branchId){
                    newData.push(item);
                }
            })
            return newData;
        }else{
            return data;
        }
    }
    const _renderBody = ()=>{
        if(loading) return <Loader text={"Načítám uživatele..."}/>
        if(!loading && data) return <UserTable initData={data}/>
        else return <></>;
    }

    return (
        <Section title={"Uživatelé systému"} description={"Výpis všech uživatelů systému"} right={(rightCheck("ROLE_Admin")||rightCheck("ROLE_Okres"))&&<Button text={<><FiPlus className={"mr-2 mt-1"}/>Přidat</>} link={"/user/add"}/>}>
            {_renderBody()}
        </Section>
    )
}
export default User;