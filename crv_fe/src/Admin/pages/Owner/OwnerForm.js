import React, {useEffect, useState} from "react";
import {Form} from "react-final-form";
import Button from "../../../Components/Fields/Button";
import {FiPlus, FiSave} from "react-icons/all";
import Section from "../../../Components/Section";
import {useParams} from "react-router";
import InputField from "../../../Components/Fields/InputField";
import CogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
import Moment from 'moment';
import {
    apiAddOwner,
    apiEditOwner, apiGetOwnerById,
} from "./Actions";
import {showToast} from "../../../Components/CrvToast";
import {OwnerSignNewCarModal} from "./OwnerSignNewCarModal";
import {rightCheck} from "../../RightCheck";

const OwnerForm = () => {
    let [loading, setLoading] = useState(false);
    let [saving, setSaving] = useState(false);
    let [initData, setInitData] = useState(null);
    const {id} = useParams();

    const history = useHistory();

    useEffect(() => {
        init();
    }, []);


    const formatDate = (dateTimeInString) => {
        if (dateTimeInString) {

            let date = new Date(dateTimeInString);
            let moment = new Moment(date);
            return moment.format("YYYY-MM-DD");
        }
    }

    const init = () => {
        if (id) {
            setLoading(true);
            apiGetOwnerById(id, (data) => {
                let initData = data;
                initData.birthDate = formatDate(data.birthDate);
                setInitData(initData);
                setLoading(false);
            }, (error) => {
                setInitData(null);
                CogoToast.error("Nepodařilo se načíst údaje o majiteli");
                history.push("/owner");
                setLoading(false);
            })
        }
    }

    const onSubmit = (values) => {
        setSaving(true);
        if (id) {
            let dataToSave = {};
            dataToSave.firstName = values.firstName;
            dataToSave.lastName = values.lastName;
            dataToSave.birthDate = values.birthDate;
            dataToSave.city = values.city;
            dataToSave.street = values.street;
            dataToSave.zipCode = parseInt(values.zipCode);
            dataToSave.numberOfHouse = parseInt(values.numberOfHouse);
            apiEditOwner(dataToSave, id, (data) => {
                showToast("success","Majitel upraven");
                setSaving(false);
                history.push("/owner/detail/"+data.id);
            }, (error) => {
                showToast("error","Majitel neuložen");
                setSaving(false);
            })
        } else {
            apiAddOwner(values, (data) => {
                showToast("success","Majitel vytvořen");
                setSaving(false);
                history.push("/owner/detail/"+data.id);
            }, (error) => {
                showToast("error",<><p>Majitel neuložen</p><p>{error.response.data.message}</p></>);
                setSaving(false);
            })
        }
    }
    return (
        <Section title={"Majitelé"} description={id ? "Editace majitele" : "Přidání majitele"}
        right={<>{id&&<OwnerSignNewCarModal ownerId={id}/>}</>}>
            <Form onSubmit={onSubmit} initialValues={initData}
                  validate={values => {
                      let error = {};
                      if (!values.firstName) {
                          error.firstName = "Povinné pole"
                      }
                      if (!values.lastName) {
                          error.lastName = "Povinné pole"
                      }
                      if (!values.birthDate) {
                          error.birthDate = "Povinné pole"
                      }
                      if (!values.street) {
                          error.street = "Povinné pole"
                      }
                      if (!values.numberOfHouse) {
                          error.numberOfHouse = "Povinné pole"
                      }
                      if (!values.zipCode) {
                          error.zipCode = "Povinné pole"
                      }
                      if (!values.city) {
                          error.city = "Povinné pole"
                      }
                      return error;
                  }}
                  render={({handleSubmit}) => {
                      return (
                          <>
                              <div className={"grid lg:grid-cols-2 grid-cols-1 gap-2"}>
                                  <InputField label={"Jméno: *"} placeHolder={"Jméno"} name={"firstName"} type={"text"}/>
                                  <InputField label={"Příjmení: *"} placeHolder={"Příjmení"} name={"lastName"} type={"text"}/>
                                  <InputField label={"Datum narození: *"} placeHolder={"Datum narození"} name={"birthDate"} type={"date"}/>
                                  <InputField label={"Ulice: *"} placeHolder={"Ulice"} name={"street"} type={"text"}/>
                                  <InputField label={"Číslo popisné: *"} placeHolder={"Číslo popisné"} name={"numberOfHouse"} type={"number"}/>
                                  <InputField label={"PSČ: *"} placeHolder={"PSČ"} name={"zipCode"} type={"number"}/>
                                  <InputField label={"Město: *"} placeHolder={"Město"} name={"city"} type={"text"}/>
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

export default OwnerForm;