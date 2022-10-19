import React from "react";
import {Field} from "react-final-form";

const InputField = ({type, label, name, placeHolder}) => {
    const inputClass = "relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm";

    return (
        <div>
            <Field name={name}>
                {({input, meta}) => (
                    <>
                        <label htmlFor={name} className="sr-only">{label}</label>
                        <input {...input} id={name} name={name} type={type} required
                               className={meta.error && meta.touched?"border-red-600 "+inputClass:inputClass}
                               placeholder={placeHolder}/>
                        {meta.touched && meta.error&&<span className={"text-red-600"}>{meta.error}</span>}
                    </>
                )}
            </Field>

        </div>
    )

}

export default InputField;