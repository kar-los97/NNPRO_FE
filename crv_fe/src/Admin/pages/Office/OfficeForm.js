import React, {useEffect, useState} from "react";
import {Form} from "react-final-form";
import Button from "../../../Components/Fields/Button";
import {FiPlus, FiSave} from "react-icons/all";
import Section from "../../../Components/Section";
import {useParams} from "react-router";
import InputField from "../../../Components/Fields/InputField";
import CogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
import {apiAddOffice, apiAddUser, apiEditOffice, apiEditUser, apiGetOfficeById, apiGetUserById} from "./Actions";
import RoleSelectField from "../../../Components/ApiFields/RoleSelectField";
import {showToast} from "../../../Components/CrvToast";
import CrvSelectField from "../../../Components/Fields/CrvSelectField";

const OfficeForm = () => {
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
            apiGetOfficeById(id, (data) => {
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
            apiEditOffice(values, id, (data) => {
                showToast("success","Pobočka upravena");
                setSaving(false);
                history.push("/user/detail/"+data.id);
            }, (error) => {
                showToast("error","Pobočka neuložena");
                setSaving(false);
            })
        } else {
            apiAddOffice(values, (data) => {
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
        <Section title={"Pobočky"} description={id ? "Editace pobočky" : "Přidání pobočky"} >
            <Form onSubmit={onSubmit} initialValues={initData}
                  validate={values => {
                      let error = {};
                      if (!values.city) {
                          error.city = "Povinné pole"
                      }
                      if (values.region==="NOT_SELECTED") {
                          error.region = "Povinné pole"
                      }
                      if (values.district==="NOT_SELECTED") {
                          error.district = "Povinné pole"
                      }
                      return error;
                  }}
                  render={({handleSubmit}) => {
                      let regions = [
                          {"label":"---NEVYBRÁNO---","value":"NOT_SELECTED"},
                          {"label":"Pardubický kraj","value":"Pardubický kraj"}
                      ];
                      let districts = [
                          {"label":"---NEVYBRÁNO---","value":"NOT_SELECTED"},
                          {"label":"okres Chrudim","value":"Chrudim"},
                          {"label":"okres Pardubice","value":"Pardubice"},
                          {"label":"okres Svitavy","value":"Svitavy"},
                          {"label":"okres Ústí nad Orlicí","value":"Ústí nad Orlicí"},

                      ];
                      return (
                          <>
                              <div className={"grid grid-cols-2 gap-2"}>
                                  <CrvSelectField name={"region"} placeHolder={"Kraj"} label={"Kraj: *"} options={regions}/>
                                  <CrvSelectField name={"district"} placeHolder={"Okres"} label={"Okres: *"} options={districts}/>
                                  <InputField type={"text"} label={"Město: *"} name={"city"} placeHolder={"Město"}/>
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

export default OfficeForm;