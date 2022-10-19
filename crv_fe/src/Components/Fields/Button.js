import React from "react";
import {FiLock} from "react-icons/all";

const Button = ({text, icon, onClick}) =>{
    return(
        <div>
            <button onClick={onClick}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {icon&&<span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiLock/>
          </span>}
                {text}
            </button>
        </div>
    )
}

export default Button;