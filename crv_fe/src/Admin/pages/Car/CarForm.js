import React, {useEffect, useState} from "react";
import {Form} from "react-final-form";
import Button from "../../../Components/Fields/Button";
import {CgGitPull, FiDelete, FiPlus, FiSave, FiSearch} from "react-icons/all";
import Section from "../../../Components/Section";
import {useParams} from "react-router";
import {apiAddCar, apiAddCarToOffice, apiEditCar, apiGetCarById, apiPutCarToDeposit, apiSignOutCar} from "./Actions";
import InputField from "../../../Components/Fields/InputField";
import CogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
import CrvSelectField from "../../../Components/Fields/CrvSelectField";
import {showToast} from "../../../Components/CrvToast";
import {CarChangeOwnerModal} from "./CarChangeOwnerModal";
import {CarOwnerHistoryModal} from "./CarOwnerHistoryModal";
import {rightCheck} from "../../RightCheck";
import {CarAssignToOfficeModal} from "./CarAssignToOfficeModal";

const CarForm = () => {
    let [loading, setLoading] = useState(false);
    let [saving, setSaving] = useState(false);
    let [initData, setInitData] = useState(null);
    let [actualOwner,setActualOwner] = useState(null);
    const {id} = useParams();

    const history = useHistory();

    useEffect(() => {
        init();
    }, []);


    const formatYear = (dateTimeInString) => {
        if (dateTimeInString) {
            let date = new Date(dateTimeInString);
            return date.getFullYear();
        }
    }

    const init = () => {
        if (id) {
            setLoading(true);
            apiGetCarById(id, (data) => {
                let initData = data;
                data.owners.map((item,index)=>{
                    if(item.endOfSignUp===null){
                        setActualOwner(item);
                    }
                })
                initData.isInDeposit = data.inDeposit;
                initData.yearOfCreation = formatYear(data.yearOfCreation);
                setInitData(initData);
                setLoading(false);
            }, (error) => {
                setInitData(null);
                CogoToast.error("Nepodařilo se načíst údaje o vozidle");
                history.push("/car");
                setLoading(false);
            })
        }
    }

    const signOutCar = ()=>{
        if(actualOwner && id){
            let data = {};
            data.carId = id;
            data.ownerId = actualOwner.id;
            apiSignOutCar(data,(data)=>{
                showToast("succes","Auto bylo odhlášeno.");
                window.location.reload();
            },(error)=>{
                showToast("error","Auto nebylo odhlášeno.");
            })
        }
    }

    const onSubmit = (values) => {

        setSaving(true);
        if (id) {
            let valToSave = {};
            valToSave.enginePower = parseFloat(values.enginePower);
            valToSave.emissionStandard = parseFloat(values.emissionStandard);
            valToSave.torque = parseFloat(values.torque);
            valToSave.yearOfCreation = values.yearOfCreation + "-01-01";
            valToSave.vin = values.vin;
            valToSave.color = values.color;
            valToSave.manufacturer = values.manufacturer;
            valToSave.type = values.type;
            valToSave.isInDeposit = values.isInDeposit;
            apiEditCar(valToSave, id, (data) => {
                showToast("success", "Vozidlo upraveno");
                setSaving(false);
                history.push("/car/detail/" + data.id);
            }, (error) => {
                showToast("error", <><p>Vozidlo se nepodařilo upravit</p><p>{error.response.data.message}</p></>);
                setSaving(false);
            })
        } else {
            let valToSave = values;
            valToSave.enginePower = parseFloat(values.enginePower);
            valToSave.emissionStandard = parseFloat(values.emissionStandard);
            valToSave.torque = parseFloat(values.torque);
            valToSave.yearOfCreation = values.yearOfCreation + "-01-01";
            apiAddCar(valToSave, (data) => {
                if(rightCheck("ROLE_Okres")){
                    apiAddCarToOffice({carId:data.id,officeId:parseInt(localStorage.getItem("branch-crv"))},(data)=>{
                        setSaving(false);
                        showToast("success", "Vozidlo vytvořeno");
                        history.push("/car/detail/" + data.id);
                    },(error)=>{
                        setSaving(false);
                        showToast("error","Nepodařilo se přiřadit vozidlo pobočce");
                        history.push("/car");
                    })
                }else{
                    setSaving(false)
                    showToast("success","Vozidlo vytvořeno");
                    history.push("/car/detail/" + data.id);
                }
            }, (error) => {
                showToast("error", <><p>Vozidlo se nepodařilo vytvořit</p><p>{error.response.data.message}</p></>);
                setSaving(false);
            })
        }
    }

    const putOnDeposit = ()=>{
        apiPutCarToDeposit(id,(data)=>{
            showToast("success","Vozidlo vloženo do depositu");
            history.push("/car/detail/"+id);
            window.location.reload();
        },(error)=>{
            showToast("success","Vozidlo se nepodařilo vložit do depositu");
        })
    }

    return (
        <Section title={"Auta"} description={id ? "Editace vozidla" : "Přidání vozidla"}
                 right={
                     <div className={"flex flex-row"}>
                         {(rightCheck("ROLE_Admin")||rightCheck("ROLE_Okres"))&&id && <div className={"mr-2"}>
                             <Button text={<><CgGitPull className={"mr-2 mt-1"}/>Vložit do depositu</>} onClick={putOnDeposit}/>
                         </div>}
                         {(rightCheck("ROLE_Admin"))&&id && <div className={"mr-2"}>
                             <CarAssignToOfficeModal carId={id}/>
                         </div>}
                         {(rightCheck("ROLE_Admin")||rightCheck("ROLE_Okres"))&&id && actualOwner && <div className={"mr-2"}>
                             <Button text={<><FiDelete className={"mr-2 mt-1"}/>Odhlásit auto</>} onClick={signOutCar}/>
                         </div>}
                         {(rightCheck("ROLE_Admin")||rightCheck("ROLE_Okres"))&&id && <div className={"mr-2"}>
                             <CarChangeOwnerModal carId={id} owners={initData&&initData.owners}/>
                         </div>}
                         {id&&<div className={""}>
                             <CarOwnerHistoryModal owners={initData&&initData.owners}/>
                         </div>}
                     </div>}>
            <Form onSubmit={onSubmit} initialValues={initData}
                  validate={values => {
                      let error = {};
                      if (!values.vin) {
                          error.vin = "Povinné pole"
                      }
                      if (!values.color) {
                          error.color = "Povinné pole"
                      }
                      if (!values.manufacturer) {
                          error.manufacturer = "Povinné pole"
                      }
                      if (!values.type) {
                          error.type = "Povinné pole"
                      }
                      if (!values.yearOfCreation) {
                          error.yearOfCreation = "Povinné pole"
                      }
                      if (!values.enginePower) {
                          error.enginePower = "Povinné pole"
                      }
                      if (!values.emissionStandard) {
                          error.emissionStandard = "Povinné pole"
                      }
                      if (!values.torque) {
                          error.torque = "Povinné pole"
                      }
                      return error;
                  }}
                  render={({handleSubmit}) => {
                      return (
                          <>
                              <div className={"grid grid-cols-2 gap-2"}>
                                  <InputField type={"text"} label={"VIN: *"} name={"vin"} placeHolder={"VIN"}/>
                                  {id && <InputField disabled={true} type={"text"} label={"SPZ: *"} name={"spz"}
                                                     placeHolder={"SPZ"} d/>}
                                  <InputField type={"text"} label={"Barva: *"} name={"color"} placeHolder={"Barva"}/>
                                  <InputField type={"text"} label={"Výrobce: *"} name={"manufacturer"}
                                              placeHolder={"Výrobce"}/>
                                  <InputField type={"text"} label={"Typ: *"} name={"type"} placeHolder={"Typ"}/>
                                  <InputField type={"number"} label={"Rok výroby: *"} name={"yearOfCreation"}
                                              placeHolder={"Rok výroby"}/>
                                  <InputField type={"number"} label={"Výkon motoru: *"} name={"enginePower"}
                                              placeHolder={"Výkon motoru"}/>
                                  <InputField type={"number"} label={"Emisní standard: *"} name={"emissionStandard"}
                                              placeHolder={"Emisní standard"}/>
                                  <InputField type={"number"} label={"Točivý moment: *"} name={"torque"}
                                              placeHolder={"Točivý moment"}/>
                                  {id&&<CrvSelectField name={"isInDeposit"} placeHolder={"V depositu"} label={"V depositu:"}
                                                  options={[{"label": "ANO", "value": true}, {
                                                      "label": "NE",
                                                      "value": false
                                                  }]} disabled={true}/>}
                              </div>
                              {(rightCheck("ROLE_Admin")||rightCheck("ROLE_Okres"))&&<Button text={"Uložit"} icon={<FiSave/>} onClick={handleSubmit} loading={saving}
                                      disable={saving}/>}
                          </>
                      )
                  }}
            />
        </Section>

    );
}

export default CarForm;