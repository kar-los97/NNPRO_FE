import React from "react";
import '../index.css';
import Navigation from "./Navigation";
import Footer from "./Footer";


const Layout = ({children}) => {
    return (
        <>
            <div className={"flex flex-row items-stretch relative pb-32 bg-black bg-opacity-5"}>
                <div className={"flex flex-col w-full z-0"}>
                    <Navigation/>
                    <div className="min-h-screen w-full p-4">{children}</div>
            </div>
            <Footer/>
        </div>
        </>
    )
}
export default Layout;