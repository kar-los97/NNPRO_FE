import React, {useEffect, useState} from "react";
import {Form} from "react-final-form";
import Button from "../../../Components/Fields/Button";
import {FiPlus, FiSave} from "react-icons/all";
import Section from "../../../Components/Section";
import {useParams} from "react-router";
import InputField from "../../../Components/Fields/InputField";
import CogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
import {
    apiAddOwner,
    apiEditOwner, apiGetOwnerById,
} from "./Actions";
import {showToast} from "../../../Components/CrvToast";
import CrvSelectField from "../../../Components/Fields/CrvSelectField";

const OwnerForm = () => {
    let [loading, setLoading] = useState(false);
    let [saving, setSaving] = useState(false);
    let [initData, setInitData] = useState(null);
    const {id} = useParams();

    const history = useHistory();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        if (id) {
            setLoading(true);
            apiGetOwnerById(id, (data) => {
                let init = data;
                init.role = data.role.id;
                setInitData(init);
                setLoading(false);
            }, (error) => {
                setInitData(null);
                CogoToast.error("Nepodařilo se načíst údaje o pobočce");
                history.push("/branch");
                setLoading(false);
            })
        }
    }

    const onSubmit = (values) => {
        setSaving(true);
        if (id) {
            apiEditOwner(values, id, (data) => {
                showToast("success","Pobočka upravena");
                setSaving(false);
                history.push("/user/detail/"+data.id);
            }, (error) => {
                showToast("error","Pobočka neuložena");
                setSaving(false);
            })
        } else {
            apiAddOwner(values, (data) => {
                showToast("success","Pobočka vytvořena");
                setSaving(false);
                history.push("/user/detail/"+data.id);
            }, (error) => {
                showToast("error",<><p>Pobočka neuložena</p><p>{error.response.data.message}</p></>);
                setSaving(false);
            })
        }
    }
    return (
        <Section title={"Majitelé"} description={id ? "Editace majitele" : "Přidání majitele"}>
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
                              <Button text={"Uložit"} icon={<FiSave/>} onClick={handleSubmit} loading={saving}
                                      disable={saving}/>
                          </>
                      )
                  }}
            />

        </Section>

    );
}

export default OwnerForm;