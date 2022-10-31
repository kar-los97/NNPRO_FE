import React, {useEffect, useRef, useState} from "react";
import Button from "../../../Components/Fields/Button";
import {FiSave, FiX, HiOfficeBuilding} from "react-icons/all";
import Portal from "../../../Components/Portal";
import Section from "../../../Components/Section";
import {Form} from "react-final-form";
import OfficeSelectField from "../../../Components/ApiFields/OfficeSelectField";
import {apiAddUserToOffice} from "../Office/Actions";
import {showToast} from "../../../Components/CrvToast";

export const UserAssignToOfficeModal = ({userId,branchOffice}) => {

    const modalRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [saving, setSaving] = useState(false);
    const [initData,setInitData] = useState([]);


    const show = () => {
        setOpen(true)
    }
    const hide = () => {
        setOpen(false)
    }

    const save = (data) => {
        setSaving(true);
        data.userId = userId;
        apiAddUserToOffice(data,(data)=>{
            setSaving(false);
            showToast("success","Uživatel byl přiřazen do kanceláře");
            hide();
        },(error)=>{
            setSaving(false);
            showToast("error","Uživatele se nepdodařilo přiřadit do kanceláře");
        })

    }

    useEffect(() => {
        if(branchOffice){
            setInitData(branchOffice.id);
        }
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
            <Button text={<><HiOfficeBuilding className={"mr-2 mt-1"}/>Přiřadit</>} onClick={show}/>
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
                                    <h3 className="text-xl font-semibold">Přiřazení uživatele do pobočky</h3>
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
                                            <Form onSubmit={save} initialValues={initData}
                                                  validate={values => {
                                                      let errors = {};
                                                      if(values.branchOfficeId === "NOT_SELECT" )
                                                          errors.branchOfficeId = "Povinné pole";
                                                      return errors;
                                                  }}
                                                  render={({handleSubmit}) => {
                                                      return (
                                                          <div className={"grid grid-cols-1"}>
                                                              <OfficeSelectField/>
                                                              <Button loading={saving} disable={saving} text={"Uložit"} icon={<FiSave/>}
                                                                      onClick={handleSubmit}/>
                                                          </div>
                                                      )
                                                  }}
                                            />
                                        </div>
                                    </Section>
                                </div>
                                <div
                                    className="flex items-center justify-end p-4 border-t border-solid rounded-b space-x-2">
                                    <Button onClick={hide}
                                            text={<span className={"flex flex-row"}><FiX className={"mr-2 mt-1"}/>Zavřít</span>}/>
                                </div>
                            </div>
                        </div>
                    </div>


                </Portal>
            )}
        </>
    )
}