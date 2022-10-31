import React from "react";

import {Switch, Route} from 'react-router-dom';
import HomePage from "./pages/Home/HomePage";
import Car from "./pages/Car/Car";
import Owner from "./pages/Owner/Owner";
import Office from "./pages/Office/Office";
import User from "./pages/User/User";
import CarForm from "./pages/Car/CarForm";
import UserForm from "./pages/User/UserForm";
import OfficeForm from "./pages/Office/OfficeForm";
import OwnerForm from "./pages/Owner/OwnerForm";

const Routes = () =>{
    return ( 
        <Switch>
            <Route exact path={"/"} component={HomePage}/>
            <Route exact path={"/car"} component={Car}/>
            <Route exact path={"/car/detail/:id"} component={CarForm}/>
            <Route exact path={"/car/add"} component={CarForm}/>
            <Route exact path={"/owner"} component={Owner}/>
            <Route exact path={"/owner/detail/:id"} component={OwnerForm}/>
            <Route exact path={"/owner/add"} component={OwnerForm}/>
            <Route exact path={"/branch"} component={Office}/>
            <Route exact path={"/branch/add"} component={OfficeForm}/>
            <Route exact path={"/branch/detail/:id"} component={OfficeForm}/>
            <Route exact path={"/user"} component={User}/>
            <Route exact path={"/user/add"} component={UserForm}/>
            <Route exact path={"/user/detail/:id"} component={UserForm}/>
        </Switch>
    )
}

export default Routes;