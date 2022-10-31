import React from "react";

export const Loader = (props) => {

    return (
        <div className="h-screen bg-white">
            <div className="flex flex-col justify-center items-center text-blue-900">
                <div className={"mb-5"}>
                    <img className="h-16 w-16" src="loading.gif"
                         alt=""/>
                </div>
                <span className={"text-2xl"}>{props.text}</span>
            </div>

        </div>
    )
}