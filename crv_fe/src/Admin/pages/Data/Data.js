import React, {useEffect, useState} from "react";
import Section from "../../../Components/Section";
import {Field, Form} from "react-final-form";
import Button from "../../../Components/Fields/Button";
import {FaFileImport} from "react-icons/all";
import {apiExportData, apiImportData} from "../Office/Actions";
import {showToast} from "../../../Components/CrvToast";

const Data = () => {
    const inputClass = "relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm";

    let [exportedData,setExportedData] = useState(null);
    let [exporting, setExporting] = useState(false);
    let [importing, setImporting] = useState(false);

    useEffect(() => {

    }, [])

    const importData = (data) => {
        setImporting(true);
        let importData = JSON.parse(data.data);
        console.log(importData);

        apiImportData(importData,(data)=>{
            showToast("success","Data importována");
            setImporting(false);
        },(error)=>{
            showToast("error","Data se nepodařilo importovat");
            setImporting(false);
        })

    }

    const exportData = (data) => {
        setExporting(true);
        apiExportData((data)=>{
            setExportedData(data);
            showToast("success","Data byla exportována");
            setExporting(false);
        },(error)=>{
            showToast("error","Data se nepodařilo exportovat");
            setExporting(false);
        })
    }

    return (
        <>
            <Section title={"Import"} description={"Export nebo import dat ze systému"}>
                <Form onSubmit={importData}
                      validate={values => {
                            let error = {};
                            if(!values.data){
                                error.data = "Povinné pole";
                            }
                            return error;
                      }}
                      render={({handleSubmit}) => {
                          return (
                              <div className={"grid grid-cols-1 gap-2"}>
                                  <Field name={"data"}>
                                      {({input, meta}) => (
                                          <>
                                              <div className={"flex flex-col"}>
                                                  <textarea {...input} id={"data"} rows={25}
                                                         className={meta.error && meta.touched ? "border-red-600 " + inputClass : inputClass}
                                                         placeholder={"Data..."}/>
                                                  {meta.touched && meta.error &&
                                                      <span className={"text-red-600"}>{meta.error}</span>}
                                              </div>
                                          </>
                                      )}
                                  </Field>
                                  <div className={"mt-3"}><Button disable={importing} loading={importing}
                                      text={<><FaFileImport className={"mr-2 mt-1"}/>Importovat</>}
                                      onClick={handleSubmit}/></div>
                              </div>
                          )
                      }}/>
            </Section>
            <Section title={"Export"} description={"Export dat ze systému"}>
                <Form onSubmit={exportData}
                      render={({handleSubmit}) => {
                          return (
                              <div className={"grid grid-cols-1 gap-2"}>
                                  <div className={"mt-3"}><Button disable={exporting} loading={exporting}
                                      text={<><FaFileImport className={"mr-2 mt-1"}/>Exportovat</>}
                                      onClick={handleSubmit}/></div>
                                  <div>
                                      {exportedData&&JSON.stringify(exportedData)}
                                  </div>
                              </div>
                          )
                      }}/>
            </Section>
        </>
    )
}
export default Data;