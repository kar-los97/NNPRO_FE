import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './store'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"

import {ClearCacheProvider} from "react-clear-cache";
import App from "./Admin/App";

ReactDOM.render(
    <ClearCacheProvider auto={true} duration={60000} basePath={'/assets'}>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path={"/"} component={App}/>
                </Switch>
            </Router>
        </Provider>
    </ClearCacheProvider>,
    document.getElementById('root')
);