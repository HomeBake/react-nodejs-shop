import React from 'react';
import {Button, Container, Form, Modal} from "react-bootstrap";
import {MENU_MODE} from "../../utils/constant";
import {useContext, useState} from "react";
import {Context} from "../../index";
import {addBrand, fetchBrands, fetchDevices, fetchTypes} from "../../http/storeAPI";
import AdminPanelDeviceInfo from "./AdminPanelDeviceInfo";
import {useEffect} from "react";
import {createDevice} from "../../http/deviceAPI";
import Notification from "../Notification";

const AdminPanelDevice = ({setMode}) => {
    const {deviceStore,brandStore,typeStore} = useContext(Context)
    const [deviceTitle, setDeviceTitle] = useState('')
    const [devicePrice, setDevicePrice] = useState('')
    const [brandId, setBrandId] = useState('')
    const [typeId, setTypeId] = useState('')
    const [file, setFile] = useState('')
    const [info, setInfo] = useState([{title: '', description: '', number: Date.now()}])
    const [notifTitle, setNotifTitle] = useState('')
    const [notifText, setNotifText] = useState('')
    const [show, setShow] = useState(false)

    useEffect( (e) => {
        fetchTypes().then(data => typeStore.setTypes(data))
        fetchBrands().then(data => brandStore.setBrands(data))
    }, [])

    async function addDevice() {
        if (deviceTitle && devicePrice && brandId && typeId) {
            const formData = new FormData()
            formData.append('name', deviceTitle)
            formData.append('price', `${devicePrice}`)
            formData.append('brandId', brandId)
            formData.append('typeId', typeId)
            formData.append('img', file)
            formData.append('info', JSON.stringify(info))
            await createDevice(formData).then(res => {
                if (res.status === 200) {
                    setNotifText('Устройство создано!')
                    setNotifTitle('Успешно')
                    setShow(true)
                    }
                else {
                    setNotifText(res.data.message)
                    setNotifTitle('Ошибка')
                    setShow(true)
                }

            } ).catch()
        }
    }

    function selectFile(e) {
        setFile(e.target.files[0])
    }

    function fill() {
        setDeviceTitle('Iphone')
        setDevicePrice('9999')
        setBrandId('1')
        setTypeId('1')
        setInfo([{title: 'Крутость', description: 'Крутой', number: Date.now()}])
    }

    return (
        <Container className={'d-flex flex-column'}>
            <Notification title={notifTitle} text={notifText} show={show} setShow={setShow}/>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создание товара
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className={'d-flex flex-column gap-2'}>
                    <Form className={'d-flex flex-column gap-2'}>
                        <Form.Control
                            placeholder={'Название товара'}
                            value={deviceTitle}
                            onChange={e => setDeviceTitle(e.target.value)}
                        />
                        <Form.Control
                            placeholder={'Стоимость'}
                            value={devicePrice}
                            onChange={e => setDevicePrice(e.target.value)}
                        />
                        <Form.Control type='file' onChange={(e)=> selectFile(e)}/>
                        <Form.Select value={brandId} onChange={e => setBrandId(e.target.value)}>
                            <option>Выберите бренд</option>
                            {brandStore.brands.map((brand) =>
                                <option key={brand.id} value={brand.id}> {brand.name} </option>
                            )}
                        </Form.Select>
                        <Form.Select value={typeId} onChange={e => setTypeId(e.target.value)}>
                            <option>Выберите тип</option>
                            {typeStore.types.map((type) =>
                                <option key={type.id} value={type.id}> {type.name} </option>
                            )}
                        </Form.Select>
                        <AdminPanelDeviceInfo info={info} setInfo={setInfo}/>
                    </Form>
                    <Button onClick={addDevice}>Создать</Button>
                    <Button variant={"secondary"} onClick={fill}>Заполнить тестовыми данными</Button>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={ _ => setMode(MENU_MODE)}>Отмена</Button>
            </Modal.Footer>
        </Container>
    );
};

export default AdminPanelDevice;