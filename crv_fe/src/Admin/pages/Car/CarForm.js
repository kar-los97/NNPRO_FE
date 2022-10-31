import React, {useEffect, useState} from "react";
import {Form} from "react-final-form";
import Button from "../../../Components/Fields/Button";
import {FiPlus, FiSave, FiSearch} from "react-icons/all";
import Section from "../../../Components/Section";
import {useParams} from "react-router";
import {apiAddCar, apiEditCar, apiGetCarById} from "./Actions";
import InputField from "../../../Components/Fields/InputField";
import CogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
import CrvSelectField from "../../../Components/Fields/CrvSelectField";
import {showToast} from "../../../Components/CrvToast";

const CarForm = () => {
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
            apiGetCarById(id, (data) => {
                setInitData(data);
                setLoading(false);
            }, (error) => {
                setInitData(null);
                CogoToast.error("Nepodařilo se načíst údaje o vozidle");
                history.push("/car");
                setLoading(false);
            })
        }
    }

    const onSubmit = (values) => {
        values.enginePower = parseFloat(values.enginePower);
        values.emissionStandard = parseFloat(values.emissionStandard);
        values.torque = parseFloat(values.torque);
        setSaving(true);
        if (id) {
            apiEditCar(values, id, (data) => {
                showToast("success","Vozidlo upraveno");
                setSaving(false);
                history.push("/car/detail/"+data.id);
            }, (error) => {
                showToast("error",<><p>Vozidlo se nepodařilo upravit</p><p>{error.response.data.message}</p></>);
                setSaving(false);
            })
        } else {

            apiAddCar(values, (data) => {
                showToast("success","Vozidlo vytvořeno");
                setSaving(false);
                history.push("/car/detail/"+data.id);
            }, (error) => {
                showToast("error",<><p>Vozidlo se nepodařilo vytvořit</p><p>{error.response.data.message}</p></>);
                setSaving(false);
            })
        }
    }
    return (
        <Section title={"Auta"} description={id ? "Editace vozidla" : "Přidání vozidla"}
                 right={<div className={""}><Button text={<><FiSearch className={"mr-2 mt-1"}/>Historie majitelů</>}/></div>}>
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
                      if (values.inDeposit===null || values.inDeposit==="NOT_SELECT") {
                          error.inDeposit = "Povinné pole"
                      }
                      return error;
                  }}
                  render={({handleSubmit}) => {
                      return (
                          <>
                              <div className={"grid grid-cols-2 gap-2"}>
                                  <InputField type={"text"} label={"VIN: *"} name={"vin"} placeHolder={"VIN"}/>
                                  {id&&<InputField disabled={true} type={"text"} label={"SPZ: *"} name={"spz"} placeHolder={"SPZ"} d/>}
                                  <InputField type={"text"} label={"Barva: *"} name={"color"} placeHolder={"Barva"}/>
                                  <InputField type={"text"} label={"Výrobce: *"} name={"manufacturer"}
                                              placeHolder={"Výrobce"}/>
                                  <InputField type={"text"} label={"Typ: *"} name={"type"} placeHolder={"Typ"}/>
                                  <InputField type={"date"} label={"Rok výroby: *"} name={"yearOfCreation"}
                                              placeHolder={"Rok výroby"}/>
                                  <InputField type={"number"} label={"Výkon motoru: *"} name={"enginePower"}
                                              placeHolder={"Výkon motoru"}/>
                                  <InputField type={"number"} label={"Emisní standard: *"} name={"emissionStandard"}
                                              placeHolder={"Emisní standard"}/>
                                  <InputField type={"number"} label={"Točivý moment: *"} name={"torque"}
                                              placeHolder={"Točivý moment"}/>
                                  <CrvSelectField name={"inDeposit"} placeHolder={"V depositu"} label={"V dpositu: *"} options={[{"label":"ANO","value":true},{"label":"NE","value":false}]}/>
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