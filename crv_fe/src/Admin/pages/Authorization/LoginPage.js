import React from "react";
import {FiLock} from "react-icons/all";
import {Form} from "react-final-form";
import InputField from "../../../Components/Fields/InputField";
import Button from "../../../Components/Fields/Button";
import CogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
const LoginPage = (props)=>{
    const history = useHistory();
    const onSubmit = (values)=>{
        CogoToast.info(JSON.stringify(values));
        props.setToken("TOKEN");
        history.push("/")
    }

    return(
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Přihlaste se do svého účtu
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            <a href="seznam.cz" className="font-medium text-indigo-600 hover:text-indigo-500">CRV systém Pardubického kraje</a>
                        </p>
                    </div>
                    <div className={"mt-8 space-y-6"}>
                        <Form onSubmit={onSubmit}
                              validate={values=>{
                                    let error = {};
                                    if(!values.login){
                                        error.login="Povinné pole"
                                    }if(!values.password) {
                                      error.password = "Povinné pole"
                                    }
                                    return error;
                              }}
                              render={({handleSubmit})=>{
                                  return(<>
                                      <div className="-space-y-px rounded-md shadow-sm">
                                          <InputField type={"text"} label={"Login"} name={"login"} placeHolder={"Login"}/>
                                          <InputField type={"password"} label={"Heslo"} name={"password"} placeHolder={"Heslo"}/>
                                      </div>

                                      <Button text={"Přihlásit se"} icon={<FiLock/>} onClick={handleSubmit}/>
                                  </>)
                              }}/>
                    </div>
                </div>
            </div>

        </>
    )
}
export default LoginPage;