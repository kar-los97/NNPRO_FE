import React from "react";

import {Switch, Route} from 'react-router-dom';
import HomePage from "./pages/Home/HomePage";
import Car from "./pages/Car/Car";
import People from "./pages/People/People";
import Branch from "./pages/Branch/Branch";

const Routes = () =>{
    return ( 
        <Switch>
            <Route exact path={"/"} component={HomePage}/>
            <Route exact path={"/cars"} component={Car}/>
            <Route exact path={"/people"} component={People}/>
            <Route exact path={"/branch"} component={Branch}/>
        </Switch>
    )
}

export default Routes;