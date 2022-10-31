import React, {useEffect, useState} from "react";
import {Form} from "react-final-form";
import Button from "../../../Components/Fields/Button";
import {FiDelete, FiPlus, FiSave, FiSearch} from "react-icons/all";
import Section from "../../../Components/Section";
import {useParams} from "react-router";
import {apiAddCar, apiEditCar, apiGetCarById, apiSignOutCar} from "./Actions";
import InputField from "../../../Components/Fields/InputField";
import CogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
import CrvSelectField from "../../../Components/Fields/CrvSelectField";
import {showToast} from "../../../Components/CrvToast";
import {CarChangeOwnerModal} from "./CarChangeOwnerModal";
import {CarOwnerHistoryModal} from "./CarOwnerHistoryModal";

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
            valToSave.isInDeposit = values.inDeposit;
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
                showToast("success", "Vozidlo vytvořeno");
                setSaving(false);
                history.push("/car/detail/" + data.id);
            }, (error) => {
                showToast("error", <><p>Vozidlo se nepodařilo vytvořit</p><p>{error.response.data.message}</p></>);
                setSaving(false);
            })
        }
    }
    return (
        <Section title={"Auta"} description={id ? "Editace vozidla" : "Přidání vozidla"}
                 right={
                     <div className={"flex flex-row"}>
                         {id && actualOwner && <div className={"mr-2"}>
                             <Button text={<><FiDelete className={"mr-2 mt-1"}/>Odhlásit auto</>} onClick={signOutCar}/>
                         </div>}
                         {id && <div className={"mr-2"}>
                             <CarChangeOwnerModal carId={id} owners={initData&&initData.owners}/>
                         </div>}
                         <div className={""}>
                             <CarOwnerHistoryModal owners={initData&&initData.owners}/>
                         </div>
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
                      if (values.inDeposit === null || values.inDeposit === "NOT_SELECT") {
                          error.inDeposit = "Povinné pole"
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
                                  <CrvSelectField name={"inDeposit"} placeHolder={"V depositu"} label={"V dpositu: *"}
                                                  options={[{"label": "ANO", "value": true}, {
                                                      "label": "NE",
                                                      "value": false
                                                  }]}/>
                              </div>
                              <Button text={"Uložit"} icon={<FiSave/>} onClick={handleSubmit} loading={saving}
                                      disable={saving}/>
                          </>
                      )
                  }}
            />
        </Section>

    );
}

export default CarForm;