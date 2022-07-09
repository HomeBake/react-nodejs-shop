import React, {useRef} from 'react';
import UserStore from "../store/UserStore";
import DeviceStore from "../store/DeviceStore";
import TypeStore from "../store/TypeStore";
import BrandStore from "../store/BrandStore";
import {createContext, useState} from "react";
import {Context} from "../index";
import BasketStore from "../store/BasketStore";



const ContextProvider = ({ children }) => {
    return (
        <Context.Provider value={{
            userStore: new UserStore(),
            deviceStore: new DeviceStore(),
            typeStore: new TypeStore(),
            brandStore: new BrandStore(),
            basketStore: new BasketStore(),
        }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;