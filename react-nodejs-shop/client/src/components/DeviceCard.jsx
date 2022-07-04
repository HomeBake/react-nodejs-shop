import React from 'react';
import {Card, Image} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/constant";
import star from "../assets/star.svg"

const DeviceCard = (props) => {
    return (
        <NavLink to={DEVICE_ROUTE + '/' + props.device.id} className={"w-25 m-4"}>
            <Card className={"d-flex flex-column align-items-center  p-2"} style={{cursor: "pointer"}} >
                <Image src={props.device.img} className={"img-thumbnail w-100 "} alt={"image"}></Image>
                <div>{props.device.name}</div>
                <div className={"align-self-end text-black-50"}>{props.device.price} рублей</div>
                <div className={"position-absolute d-flex align-items-center"} style={{right: 20, fontSize: 20 }} >
                    <div>
                        {props.device.rate}

                    </div>
                    <Image src={star} width={"20px"} height={"20px"}/>
                </div>

            </Card>
        </NavLink>
    );
};

export default DeviceCard;