import React from 'react';
import ModalWindow from "../ModalWindow";
import {useState} from "react";
import AdminPanelMenu from "./AdminPanelMenu";
import AdminPanelType from "./AdminPanelType";
import AdminPanelBrand from "./AdminPanelBrand";
import AdminPanelDevice from "./AdminPanelDevice";
import {BRAND_MODE, DEVICE_MODE, MENU_MODE, TYPE_MODE} from "../../utils/constant";






const AdminPanel = ({visible, onHide}) => {
    console.log(visible)
    const [mode, setMode] = useState(MENU_MODE)
    return (
        <ModalWindow show={visible} onHide={onHide}>
            {mode === MENU_MODE && <AdminPanelMenu setMode={setMode}/>}
            {mode === TYPE_MODE && <AdminPanelType setMode={setMode}/>}
            {mode === BRAND_MODE && <AdminPanelBrand setMode={setMode}/>}
            {mode === DEVICE_MODE && <AdminPanelDevice setMode={setMode}/>}
        </ModalWindow>
    );
};

export default AdminPanel;