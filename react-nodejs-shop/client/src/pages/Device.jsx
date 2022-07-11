import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Image, Spinner, Table} from "react-bootstrap";
import {fetchDevice, isDeviceInBasket, setDeviceRating} from "../http/deviceAPI";
import {NavLink, useParams} from "react-router-dom";
import useLoading from "../hooks/useLoading";
import {addBasketDevice, deleteBasketDevice} from "../http/basketAPI";
import RatingStars from "../components/RatingStars";
import {Context} from "../index";
import ModalWindow from "../components/ModalWindow";
import {LOGIN_ROUTE} from "../utils/constant";

const Device = () => {
    const [device,setDevice] = useState({})
    const [rate, setRate] = useState(0)
    const [isBasket, setIsBasket] = useState(false)
    const [initUserRate, setInitUserRate] = useState(0)
    const [loading, endLoading] = useLoading()
    const {userStore} = useContext(Context)
    const {id} = useParams()
    const [authNotif,setAuthNotif] = useState(false)

    const removeDeviceFromBasket = () => {
        userStore.isAuth
            ?
            deleteBasketDevice(id).then( () => setIsBasket(false))
            :
            setAuthNotif(true)
    }

    const addDeviceToBasket = () => {
        userStore.isAuth
            ?
            addBasketDevice(id).then( () => setIsBasket(true))
            :
            setAuthNotif(true)
    }

    const setRates = (rate) => {
        userStore.isAuth
            ?
            setDeviceRating(id,rate).then( () => setInitUserRate(rate))
            :
            setAuthNotif(true)
    }


    useEffect(() => {
        fetchDevice(id).then((data) => {
            setDevice(data.device)
            const initRate = Math.round(data.rate[0].AVGrate)
            if (initRate) {
                setRate(initRate)
            }
        })
        userStore.isAuth && isDeviceInBasket(id).then((data) => {
            setIsBasket(data.isInBasket)
            if(data.userRate) {
                setInitUserRate(data.userRate)
            }
        })
        endLoading()

    }, [])
    useEffect(()=> {
        fetchDevice(id).then((data) => {
            setDevice(data.device)
            const initRate = Math.round(data.rate[0].AVGrate)
            setRate(initRate)
        })
    }, [initUserRate])

    return (
        <Container className={"d-flex mt-5"}>
            <Image src={process.env.REACT_APP_API_URL + device.img} className={'w-25 me-5'}/>
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
                <ModalWindow show={authNotif} onHide={()=> setAuthNotif(false)}>
                    Для данного действия нужно <NavLink to={LOGIN_ROUTE}> <u>авторизоваться</u> </NavLink>
                </ModalWindow>
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