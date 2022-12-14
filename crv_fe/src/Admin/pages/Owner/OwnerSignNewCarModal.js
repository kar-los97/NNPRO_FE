import React, {useEffect, useRef, useState} from "react";
import Button from "../../../Components/Fields/Button";
import {FiPlus, FiSave, FiX, HiOfficeBuilding} from "react-icons/all";
import Portal from "../../../Components/Portal";
import Section from "../../../Components/Section";
import {Form} from "react-final-form";
import OfficeSelectField from "../../../Components/ApiFields/OfficeSelectField";
import {apiAddUserToOffice} from "../Office/Actions";
import {showToast} from "../../../Components/CrvToast";
import InputField from "../../../Components/Fields/InputField";
import CrvSelectField from "../../../Components/Fields/CrvSelectField";
import {apiAddCarToOffice, apiSignCarToOwner} from "../Car/Actions";
import {useHistory} from "react-router-dom";
import {rightCheck} from "../../RightCheck";
import {apiGetOwnerById} from "./Actions";

export const OwnerSignNewCarModal = ({ownerId}) => {

    const modalRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [saving, setSaving] = useState(false);
    const [initData,setInitData] = useState([]);

    const history = useHistory();

    const show = () => {
        setOpen(true)
    }
    const hide = () => {
        setOpen(false)
    }

    const save = (data) => {
        setSaving(true);
        let valToSave = data;
        valToSave.enginePower = parseFloat(data.enginePower);
        valToSave.emissionStandard = parseFloat(data.emissionStandard);
        valToSave.torque = parseFloat(data.torque);
        valToSave.yearOfCreation = data.yearOfCreation + "-01-01";
        apiSignCarToOwner(data,ownerId,(data)=>{
            if(rightCheck("ROLE_Okres")){
                apiGetOwnerById(data.id,(data)=>{
                    let carId = 0;
                    data.cars&&data.cars.map((item,index)=>{
                        if(item.id>carId){
                            carId = item.id;
                        }
                    })
                    if(carId!==0){
                        apiAddCarToOffice({carId:carId,officeId:parseInt(localStorage.getItem("branch-crv"))},(data)=>{
                            setSaving(false);
                            showToast("success", "Vozidlo vytvo??eno");
                            history.push("/car/detail/" + data.id);
                        },(error)=>{
                            setSaving(false);
                            showToast("error","Nepoda??ilo se p??i??adit vozidlo pobo??ce");
                            history.push("/car");
                        })
                    }
                },(error)=>{
                    setSaving(false);
                    showToast("error","Nepoda??ilo se p??i??adit vozidlo pobo??ce");
                    history.push("/car");
                })

            }else{
                setSaving(false)
                showToast("success","Vozidlo vytvo??eno");
                history.push("/car/detail/" + data.id);
            }
        },(error)=>{
            setSaving(false);
            showToast("error","Nepoda??ilo se p??ihl??sit nov?? auto");
        })
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!modalRef || !modalRef.current) return false
            if (!open || modalRef.current.contains(event.target)) {
                return false
            }
            setOpen(!open)
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open, modalRef])

    return (
        <>
            <Button text={<><FiPlus className={"mr-2 mt-1"}/>P??ihl??sit nov?? auto</>} onClick={show}/>
            {open && (
                <Portal selector="#portal">
                    <div
                        className="transform ease-in-out duration-150 opacity-0 fixed inset-0 h-full w-full overflow-hidden bg-black pointer-events-none invisible cursor-none z-20 pointer-events-auto visible cursor-pointer opacity-25 z-10 "></div>
                    <div
                        className={"transform flex justify-center items-center overflow-hidden fixed inset-0 border outline-none z-30 bg-transparent"}>
                        <div className={"relative min-w-sm w-auto mx-auto lg:max-w-5xl"} ref={modalRef}>
                            {/*MODAL CONTENT*/}
                            <div className="bg-gray-100 text-blue-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                                <div className="flex items-center justify-between p-4 border-b border-solid rounded-t">
                                    <h3 className="text-xl font-semibold">P??ihl????en?? nov??ho auta</h3>
                                    <button
                                        className="btn btn-transparent mt-1 ml-5"
                                        onClick={hide}>
                                        <span className={"text-red-700"}><FiX size={18} className="stroke-current text-red"/></span>
                                    </button>
                                </div>
                                {/*OBSAH*/}
                                <div className="relative p-4 flex-auto">
                                    <Section>
                                        <div className={"flex flex-col"}>
                                            <Form onSubmit={save}
                                                  validate={values => {
                                                      let error = {};
                                                      if (!values.vin) {
                                                          error.vin = "Povinn?? pole"
                                                      }
                                                      if (!values.color) {
                                                          error.color = "Povinn?? pole"
                                                      }
                                                      if (!values.manufacturer) {
                                                          error.manufacturer = "Povinn?? pole"
                                                      }
                                                      if (!values.type) {
                                                          error.type = "Povinn?? pole"
                                                      }
                                                      if (!values.yearOfCreation) {
                                                          error.yearOfCreation = "Povinn?? pole"
                                                      }
                                                      if (!values.enginePower) {
                                                          error.enginePower = "Povinn?? pole"
                                                      }
                                                      if (!values.emissionStandard) {
                                                          error.emissionStandard = "Povinn?? pole"
                                                      }
                                                      if (!values.torque) {
                                                          error.torque = "Povinn?? pole"
                                                      }
                                                      if (values.inDeposit === null || values.inDeposit === "NOT_SELECT") {
                                                          error.inDeposit = "Povinn?? pole"
                                                      }
                                                      return error;
                                                  }}
                                                  render={({handleSubmit}) => {
                                                      return (
                                                          <>
                                                              <div className={"grid grid-cols-2 gap-2"}>
                                                                  <InputField type={"text"} label={"VIN: *"} name={"vin"} placeHolder={"VIN"}/>
                                                                  <InputField type={"text"} label={"Barva: *"} name={"color"} placeHolder={"Barva"}/>
                                                                  <InputField type={"text"} label={"V??robce: *"} name={"manufacturer"}
                                                                              placeHolder={"V??robce"}/>
                                                                  <InputField type={"text"} label={"Typ: *"} name={"type"} placeHolder={"Typ"}/>
                                                                  <InputField type={"number"} label={"Rok v??roby: *"} name={"yearOfCreation"}
                                                                              placeHolder={"Rok v??roby"}/>
                                                                  <InputField type={"number"} label={"V??kon motoru: *"} name={"enginePower"}
                                                                              placeHolder={"V??kon motoru"}/>
                                                                  <InputField type={"number"} label={"Emisn?? standard: *"} name={"emissionStandard"}
                                                                              placeHolder={"Emisn?? standard"}/>
                                                                  <InputField type={"number"} label={"To??iv?? moment: *"} name={"torque"}
                                                                              placeHolder={"To??iv?? moment"}/>
                                                                  <CrvSelectField name={"inDeposit"} placeHolder={"V depositu"} label={"V dpositu: *"}
                                                                                  options={[{"label": "ANO", "value": true}, {
                                                                                      "label": "NE",
                                                                                      "value": false
                                                                                  }]}/>
                                                              </div>
                                                              <Button text={"Ulo??it"} icon={<FiSave/>} onClick={handleSubmit} loading={saving}
                                                                      disable={saving}/>
                                                          </>
                                                      )
                                                  }}
                                            />
                                        </div>
                                    </Section>
                                </div>
                                <div
                                    className="flex items-center justify-end p-4 border-t border-solid rounded-b space-x-2">
                                    <Button onClick={hide}
                                            text={<span className={"flex flex-row"}><FiX className={"mr-2 mt-1"}/>Zav????t</span>}/>
                                </div>
                            </div>
                        </div>
                    </div>


                </Portal>
            )}
        </>
    )
}