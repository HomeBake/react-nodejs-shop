import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter as Router,} from "react-router-dom";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {observer} from "mobx-react-lite";
import jwtDecode from "jwt-decode";
import useLoading from "./hooks/useLoading";

const App = observer(() => {
    const [visible, setVisible] = useState(false)
    const [loading, endLoading] = useLoading()

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const {userStore} = useContext(Context)

    const getUser = async () => {
        let token
        await check().then(data =>
            token = data.token
        )
        if (token) {
            const user = jwtDecode(token)
            localStorage.setItem('token', token)
            userStore.setUser(user)
        }
    }

    useEffect(()=> {
        if (userStore.isAuth) {
            getUser().then()
        }
        else {
            userStore.setIsAuth(false)
        }
        endLoading()
    }, [])

    return (
        <Router>
            <NavBar toggle={toggleVisible} loading={loading}/>
            <AppRouter/>
            <AdminPanel visible={visible} onHide={()=> setVisible(false)}/>
        </Router>
    );
});

export default App;
