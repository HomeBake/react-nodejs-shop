import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row, Spinner, Table} from "react-bootstrap";
import star from "../assets/star.svg"
import {fetchDevice, isDeviceInBasket, setDeviceRating} from "../http/deviceAPI";
import {useParams} from "react-router-dom";
import useLoading from "../hooks/useLoading";
import {addBasketDevice, deleteBasketDevice} from "../http/basketAPI";
import RatingStars from "../components/RatingStars";

const Device = () => {
    const [device,setDevice] = useState({})
    const [rate, setRate] = useState(0)
    const [isBasket, setIsBasket] = useState(false)
    const [loading, endLoading] = useLoading()
    const {id} = useParams()
    const [initUserRate, setInitUserRate] = useState(0)
    useEffect(() => {
        fetchDevice(id).then((data) => {
            setDevice(data.device)
            const initRate = Math.round(data.rate[0].AVGrate)
            if (initRate) {
                setRate(initRate)
            }
        })
        isDeviceInBasket(id).then((data) => {
            setIsBasket(data.isInBasket)
            if(data.userRate) {
                setInitUserRate(data.userRate)
            }
        }).finally(endLoading)

    }, [])
    useEffect(()=> {
        fetchDevice(id).then((data) => {
            setDevice(data.device)
            const initRate = Math.round(data.rate[0].AVGrate)
            setRate(initRate)
        })
    }, [initUserRate])

    const removeDeviceFromBasket = () => {
        deleteBasketDevice(id).then( () => setIsBasket(false))
    }
    const addDeviceToBasket = () => {
        addBasketDevice(id).then( () => setIsBasket(true))
    }

    const setRates = (rate) => {
        setDeviceRating(id,rate).then( () => setInitUserRate(rate))
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
                        <Container className={'d-flex flex-column'}>
                            <div className={"m-0"}>Ваш рейтинг: {initUserRate}  </div>
                            <div className={"m-0"}>Пользовательский рейтинг: {rate}  </div>
                            <RatingStars setRates={setRates} initUserRate={initUserRate} rate={rate} setInitUserRate={setInitUserRate}/>
                        </Container>
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