import React, {useState} from "react";
import {BrowserRouter as Router,} from "react-router-dom";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import AdminPanel from "./components/AdminPanel/AdminPanel";

function App() {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        setVisible(!visible)
    }

    return (
        <Router>
            <NavBar toggle={toggleVisible}/>
            <AppRouter/>
            <AdminPanel visible={visible} onHide={()=> setVisible(false)}/>
        </Router>
    );
}

export default App;
