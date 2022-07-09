import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {fetchBasket} from "../http/basketAPI";
import {observer} from "mobx-react-lite";
import BasketDevice from "../components/BasketDevice";
import DeviceList from "../components/DeviceList";

const Basket = observer(() => {
    const {deviceStore} = useContext(Context)

    useEffect(() => {
        fetchBasket().then( data => deviceStore.setDevices(data) )
    }, [])

    return (
        <DeviceList></DeviceList>
    );
});

export default Basket;