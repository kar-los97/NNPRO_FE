import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import Routes from './Routes'
import {axios} from "../axiosConfig";
import LoginPage from "./pages/Authorization/LoginPage";
import Layout from "../Components/Layout";
import {Loader} from "../Components/Loader";
import '../index.css';

const App = () => {

    let [loading, setLoading] = useState(true)
    let [token, setToken] = useState(null)

    const history = useHistory();

    useEffect(() => {
        authorize()
    },[])


    const authorize = () => {

        let storageToken = localStorage.getItem('ath-crv')

        if(!storageToken) {
            setLoading(false);
            history.push("/login")
        }else {
            axios.defaults.headers.common['Authorization'] = storageToken;
            setToken(storageToken);
            setLoading(false);
        }
    }


    if (loading) return <div className="min-h-screen w-full p-4"><Loader text={"Připravuji stránku..."}/></div>
    if (!token) return <LoginPage setToken={setToken}/>
    if (token && !loading) return <Layout><Routes/></Layout>


}
export default App;