import React, {useContext} from 'react';
import {Context} from "../index";
import {Container} from "react-bootstrap";
import DeviceCard from "./DeviceCard";
import {observer} from "mobx-react-lite";



const DeviceList =  observer(() => {
    const {deviceStore} = useContext(Context)
    return (
        <Container className={"d-flex flex-row flex-wrap"}>
            {deviceStore.devices.map((device)=>
                <DeviceCard
                    key={device.id}
                    device={device}
                />
            )}
        </Container>
    );
});

export default DeviceList;