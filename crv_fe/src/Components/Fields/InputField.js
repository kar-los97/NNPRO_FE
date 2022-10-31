import React from "react";
import {Field} from "react-final-form";

const InputField = ({type, label, name, placeHolder, disabled = false}) => {
    const inputClass = "relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm";

    return (
        <div>
            <Field name={name}>
                {({input, meta}) => (
                    <>
                        <div className={"flex flex-col"}>
                            <div className={"ml-2"}><label htmlFor={name} className="text-gray-600">{label}</label>
                            </div>
                            <input {...input} id={name} name={name} type={type}
                                   className={meta.error && meta.touched ? "border-red-600 " + inputClass : inputClass}
                                   placeholder={placeHolder} disabled={disabled}/>
                            {meta.touched && meta.error && <span className={"text-red-600"}>{meta.error}</span>}
                        </div>
                    </>
                )}
            </Field>

        </div>
    )


}

export default InputField;