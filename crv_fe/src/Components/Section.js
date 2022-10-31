import React from "react";

const Section = ({
    title=null,
    description = null,
    right = null,
    children
                 })=>{
    return(
        <div className={"w-full p-4 mb-4 rounded-lg bg-white"}>
            {(title || description || right) && (
                <div className="flex flex-row items-center justify-between mb-6">
                    <div className="flex flex-col">
                        <div className="text-3xl font-light text-blue-700">{title}</div>
                        <div className="text-xl font-bold">{description}</div>
                    </div>
                    {right}
                </div>
            )}
            {children}
        </div>
    )
}
export default Section;