import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row, Table} from "react-bootstrap";
import star from "../assets/star.svg"
import {fetchDevice} from "../http/deviceAPI";
import {useParams} from "react-router-dom";

const Device = () => {
    const [device,setDevice] = useState({
            id: 1,
            name: 'iPhone 12s+',
            price: 100000,
            typeId: 1,
            brandId: 2,
            rate: 5,
            img: "https://st.depositphotos.com/3228497/4236/v/600/depositphotos_42366715-stock-illustration-smart-phone-android-vector.jpg",
            device_info: [
                {
                    id: 1,
                    title: "RAM",
                    description: "20 GB",
                },
                {
                    id: 2,
                    title: "Display",
                    description: "LED 12k",
                },
            ],
        })

    const {id} = useParams()

    useEffect((e) => {
        fetchDevice(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className={"d-flex mt-5"}>
                <Image src={device.img}/>
                <div className={"d-flex flex-column w-100 "}>
                    <div className={"d-flex flex-row w-100 justify-content-between"}>
                        <h1> {device.name}</h1>
                        <div className={"d-flex align-items-center"}>
                            <Button className={"me-3"} variant="outline-secondary"> Добавить в корзину</Button>
                            <h1 className={"m-0"}> {device.rate}</h1>
                            <Image  src={star} width={"40px"} height={"40px"}/>
                        </div>
                    </div>
                    {device.info ?
                        <Table striped bordered hover>
                            <tbody>
                            {device.info.map( (info) =>
                                <tr key={info.id}>
                                    <td>{info.title}</td>
                                    <td>{info.description}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        :
                        ''
                    }
                </div>
        </Container>
    );
};

export default Device;