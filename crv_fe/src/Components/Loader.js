import React from "react";

export const Loader = (props) => {

    return (
        <div className="h-screen bg-white">
            <div className="flex flex-col justify-center items-center h-full text-blue-900">
                <div className={"mb-5"}>
                    <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                         alt=""/>
                </div>
                <span className={"text-2xl"}>{props.text}</span>
            </div>

        </div>
    )
}