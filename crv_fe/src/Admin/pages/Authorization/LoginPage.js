import React, {useState} from "react";
import {AiFillCar, FiLock} from "react-icons/all";
import {Form} from "react-final-form";
import InputField from "../../../Components/Fields/InputField";
import Button from "../../../Components/Fields/Button";
import {useHistory} from "react-router-dom";
import {apiUserLogin} from "./Actions";
import {axios} from "../../../axiosConfig";
import {showToast} from "../../../Components/CrvToast";
import {apiGetUserById} from "../User/Actions";
import {rightCheck} from "../../RightCheck";

const LoginPage = (props) => {
    let [loading, setLoading] = useState(false);
    const history = useHistory();

    const onSubmit = (values) => {
        setLoading(true);
        apiUserLogin(values, async (data) => {
            const token = "Bearer " + data.token;
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem("ath-crv", token);
            let auth = [];
            data.authorities.map((item, index) => {
                auth.push(item.authority);
            })
            let role = auth.join(";");
            localStorage.setItem("role-crv", role);
            if(rightCheck("ROLE_Okres")){
                apiGetUserById(data.id,(data)=>{
                    if(data.branchOfficeDto && data.branchOfficeDto.id){
                        localStorage.setItem("branch-crv",data.branchOfficeDto.id);
                    }

                    setLoading(false);
                    props.setToken(token);
                    history.push("/");
                },(error)=>{
                    localStorage.removeItem("role-crv");
                    localStorage.removeItem("ath-crv");
                    showToast("error","Přihlášení se nezdařilo.")
                    setLoading(false);
                })
            }else{
                setLoading(false);
                props.setToken(token);
                history.push("/");
            }

        }, (error) => {
            showToast("error","Přihlášení se nezdařilo");
            setLoading(false);
        })
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div className={"flex items-center justify-center text-blue-700 text-center"}> <span><AiFillCar size={80}/></span></div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Přihlaste se ke svému účtu
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            <span className="font-medium text-blue-700">CRV systém Pardubického kraje</span>
                        </p>
                    </div>
                    <div className={"mt-8 space-y-6"}>
                        <Form onSubmit={onSubmit}
                              validate={values => {
                                  let error = {};
                                  if (!values.username) {
                                      error.login = "Povinné pole"
                                  }
                                  if (!values.password) {
                                      error.password = "Povinné pole"
                                  }
                                  return error;
                              }}
                              render={({handleSubmit}) => {
                                  return (<>
                                      <div className="-space-y-px rounded-md shadow-sm">
                                          <InputField type={"text"} label={""} name={"username"}
                                                      placeHolder={"Login"}/>
                                          <InputField type={"password"} label={""} name={"password"}
                                                      placeHolder={"Heslo"}/>
                                      </div>

                                      <Button text={"Přihlásit se"} loading={loading} disable={loading} icon={<FiLock/>}
                                              onClick={handleSubmit}/>
                                  </>)
                              }}/>
                    </div>
                </div>
            </div>

        </>
    )
}
export default LoginPage;