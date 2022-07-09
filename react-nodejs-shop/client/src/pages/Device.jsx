import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row, Spinner, Table} from "react-bootstrap";
import star from "../assets/star.svg"
import {fetchDevice, isDeviceInBasket} from "../http/deviceAPI";
import {useParams} from "react-router-dom";
import useLoading from "../hooks/useLoading";
import {addBasketDevice, deleteBasketDevice} from "../http/basketAPI";

const Device = () => {
    const [device,setDevice] = useState({})
    const [isBasket, setIsBasket] = useState(false)
    const [loading, endLoading] = useLoading()

    const {id} = useParams()

    useEffect(() => {
        fetchDevice(id).then((data) => {
            setDevice(data.device)
        })
        isDeviceInBasket(id).then((data) =>
            setIsBasket(data.isInBasket)).finally(endLoading)
    }, [])

    const removeDeviceFromBasket = () => {
        deleteBasketDevice(id).then( () => setIsBasket(false))
    }
    const addDeviceToBasket = () => {
        addBasketDevice(id).then( () => setIsBasket(true))
    }


    return (
        <Container className={"d-flex mt-5"}>
            <div className={"d-flex flex-column w-100 "}>
                <div className={"d-flex flex-row w-100 justify-content-between"}>
                    <h1> {device.name}</h1>
                    <div className={"d-flex align-items-center"}>
                        {loading && <Spinner animation={"border"}></Spinner>}
                        {isBasket
                            ?
                            <Button className={"me-3"} variant="outline-secondary" onClick={removeDeviceFromBasket}> Убрать из корзины</Button>
                            :
                            <Button className={"me-3"} variant="outline-secondary" onClick={addDeviceToBasket}> Добавить в корзину</Button>
                        }

                        <h1 className={"m-0"}> {device.rate}</h1>
                        <Image  src={star} width={"40px"} height={"40px"}/>
                    </div>
                </div>
                {device.device_infos ?
                    <Table striped bordered hover>
                        <tbody>
                        {device.device_infos.map( (info) =>
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