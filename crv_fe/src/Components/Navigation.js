import React from "react";
import {Link, useHistory} from 'react-router-dom';
import {rightCheck} from "../Admin/RightCheck";
import CogoToast from "cogo-toast";
import {
    AiFillCar, FaCarSide,
    FiHome, HiOfficeBuilding, HiUserGroup,
    IoIosPeople, RiHome2Fill, RiLogoutBoxRFill
} from "react-icons/all";

const Navigation = () => {
    const history = useHistory();
    const logout = ()=>{
        localStorage.removeItem("role-crv");
        localStorage.removeItem("ath-crv");
        history.push("/login");
        window.location.reload();
    }
    return (
        <nav className="flex justify-content-center w-full px-2 object-center bg-white border-gray-200 rounded my-2 dark:bg-gray-900 dark:border-gray-700">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="/" className="flex items-center">
                    <div className={"mx-2 text-blue-700"}> <AiFillCar size={40}/></div>
                    <span
                        className="self-center text-xl text-blue-700 font-semibold whitespace-nowrap dark:text-white">CRV systém</span>
                </a>
                <button data-collapse-toggle="mobile-menu" type="button"
                        className="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500"
                        aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <div id="dropdownNavbar"
                                 className="hidden z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-400"
                                    aria-labelledby="dropdownLargeButton">
                                </ul>
                                <div className="py-1">
                                    <a href="#"
                                       className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign
                                        out</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Item text={<><RiHome2Fill size={20} className={"mr-1"}/>Domů</>} url={"/"}/>
                        </li>
                        <li>
                            <Item text={<><AiFillCar size={20} className={"mr-1"}/>Auta</>} url={"/car"}/>
                        </li>
                        <li>
                            <Item text={<><IoIosPeople size={20} className={"mr-1"}/>Majitelé</>} url={"/owner"}/>
                        </li>
                        {rightCheck("ROLE_Admin")?
                        <li>
                            <Item text={<><HiOfficeBuilding size={20} className={"mr-1"}/>Pobočky</>} url={"/branch"}/>
                        </li>:<></>
                        }
                        {rightCheck("ROLE_Admin")?
                            <li>
                                <Item text={<><HiUserGroup size={20} className={"mr-2"}/>Uživatelé</>} url={"/user"}/>
                            </li>:<></>
                        }
                        <li>
                            <button onClick={logout} className={"block border border-blue-600 py-2 px-4 text-gray-100 hover:text-blue-700 hover:border bg-blue-700 rounded hover:bg-gray-100 font-medium"}>
                                <span className={"flex flex-row uppercase"}><><RiLogoutBoxRFill size={20} className={"mr-1"}/>Odhlásit se</></span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navigation;

const Item = ({text, url,icon}) => {
    let style = "block border border-blue-600 py-2 px-4 rounded ";
    if(isActive(url)){
        style+="hover:text-gray-100 text-blue-700 hover:bg-blue-700 bg-gray-100 border"
    }else{
        style+="text-gray-100 hover:text-blue-700 bg-blue-700 hover:bg-gray-100 hover:border"
    }
    return (
        <Link to={url}
              className={""}>
            <div
                className={style}>
                {icon&&<span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}
          </span>}
                <span className={"flex flex-row uppercase"}>{text}</span>
            </div>
        </Link>
    )
}

const isActive = (url)=>{
    if(url==="/"){
        return window.location.pathname===url;
    }
    else{
        return window.location.pathname.includes(url);
    }

}