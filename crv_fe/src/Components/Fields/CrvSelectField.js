import React from "react";
import {Field} from "react-final-form";

const CrvSelectField = ({options, label, name, placeHolder,loading=false,disabled=false}) => {
    const inputClass = "relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm";


    return (
        <div>
            <Field name={name}>
                {({input, meta}) => (
                    <>
                        <div className={"flex flex-col"}>
                            <div className={"ml-2"}><label htmlFor={name} className="text-gray-600">{label}</label></div>
                            <select {...input} disabled={disabled}
                                    className={meta.error && meta.touched ? "border-red-600 " + inputClass : inputClass}
                                    placeholder={loading?"Načítám data...":placeHolder}>
                                {options&&options.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                            {meta.touched && meta.error && <span className={"text-red-600"}>{meta.error}</span>}
                        </div>
                    </>
                )}
            </Field>

        </div>
    )

}

export default CrvSelectField;