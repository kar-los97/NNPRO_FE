import React, {useEffect, useState} from "react";
import {Form} from "react-final-form";
import Button from "../../../Components/Fields/Button";
import {
    FiSave,
    RiLockPasswordFill
} from "react-icons/all";
import Section from "../../../Components/Section";
import {useParams} from "react-router";
import InputField from "../../../Components/Fields/InputField";
import CogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
import {apiAddUser, apiEditUser, apiGetUserById} from "./Actions";
import RoleSelectField from "../../../Components/ApiFields/RoleSelectField";
import {showToast} from "../../../Components/CrvToast";
import {UserAssignToOfficeModal} from "./UserAssignToOfficeModal";
import {data} from "autoprefixer";
import {rightCheck} from "../../RightCheck";

const UserForm = () => {
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
            apiGetUserById(id, (data) => {
                let init = data;
                init.role = data.role.id;
                setInitData(init);
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
        setSaving(true);
        if (id) {
            let saveData = {};
            saveData.username = values.username;
            saveData.email = values.email;
            saveData.jobPosition = values.jobPosition;
            saveData.role = values.role;
            saveData.password = values.password;
            apiEditUser(saveData, id, (data) => {
                showToast("success", "Uživatel upraven");
                setSaving(false);
                history.push("/user/detail/" + data.id);
            }, (error) => {
                showToast("error", "Uživatel neuložen");
                setSaving(false);
            })
        } else {

            apiAddUser(values, (data) => {
                showToast("success", "Uživatel vytvořen");
                setSaving(false);
                history.push("/user/detail/" + data.id);
            }, (error) => {
                showToast("error", <><p>Uživatel neuložen</p><p>{error.response.data.message}</p></>);
                setSaving(false);
            })
        }
    }
    return (
        <Section title={"Uživatelé systému"} description={id ? "Editace uživatele" : "Přidání uživatele"}
                 right={(rightCheck("ROLE_Admin")||rightCheck("ROLE_Okres"))&&id &&
                     <div className={"flex flex-row"}>
                         <div className={"mr-2"}><UserAssignToOfficeModal branchOffice={data?data.branchOfficeDto:null} userId={id}/></div>
                     </div>
                 }>
            <Form onSubmit={onSubmit} initialValues={initData}
                  validate={values => {
                      let error = {};
                      if (!values.username) {
                          error.username = "Povinné pole"
                      }
                      if (!values.email) {
                          error.email = "Povinné pole"
                      }
                      if (!values.password) {
                          error.password = "Povinné pole"
                      }
                      if (!values.jobPosition) {
                          error.jobPosition = "Povinné pole"
                      }
                      if (values.role === "NOT_SELECTED") {
                          error.role = "Povinné pole"
                      }
                      return error;
                  }}
                  render={({handleSubmit}) => {
                      return (
                          <>
                              <div className={"grid grid-cols-2 gap-2"}>
                                  <InputField type={"text"} label={"Uživatelské jméno: *"} name={"username"}
                                              placeHolder={"Uživatelské jméno"}/>
                                  <InputField type={"email"} label={"E-mail: *"} name={"email"} placeHolder={"E-mail"}/>
                                  <InputField type={"password"} label={"Heslo: *"} name={"password"}
                                                      placeHolder={"Heslo"}/>
                                  <InputField type={"text"} label={"Pozice: *"} name={"jobPosition"}
                                              placeHolder={"Pozice"}/>
                                  <RoleSelectField/>
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

export default UserForm;