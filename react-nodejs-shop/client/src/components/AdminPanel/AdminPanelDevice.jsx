import React from 'react';
import {Button, Container, Form, Modal} from "react-bootstrap";
import {MENU_MODE} from "../../utils/constant";
import {useContext, useState} from "react";
import {Context} from "../../index";
import {addBrand, fetchBrands, fetchDevices, fetchTypes} from "../../http/storeAPI";
import AdminPanelDeviceInfo from "./AdminPanelDeviceInfo";
import {useEffect} from "react";
import {createDevice} from "../../http/deviceAPI";

const AdminPanelDevice = ({setMode}) => {
    const {deviceStore,brandStore,typeStore} = useContext(Context)
    const [deviceTitle, setDeviceTitle] = useState('')
    const [devicePrice, setDevicePrice] = useState('')
    const [brandId, setBrandId] = useState('')
    const [typeId, setTypeId] = useState('')
    const [file,setFile] = useState('')
    const [info, setInfo] = useState([{title: '', description: '', number: Date.now()}])

    useEffect( (e) => {
        fetchTypes().then(data => typeStore.setTypes(data))
        fetchBrands().then(data => brandStore.setBrands(data))
    }, [])

    async function addDevice() {
        if (deviceTitle && devicePrice && file && brandId && typeId) {
            const formData = new FormData()
            formData.append('name', deviceTitle)
            formData.append('price', `${devicePrice}`)
            formData.append('brandId', brandId)
            formData.append('typeId', typeId)
            formData.append('img', file)
            formData.append('info', JSON.stringify(info))
            await createDevice(formData).then(res => console.log(res)).catch(res => console.log(res))
        }
    }

    function selectFile(e) {
        setFile(e.target.files[0])
    }

    return (
        <Container>
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
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={ _ => setMode(MENU_MODE)}>Отмена</Button>
            </Modal.Footer>
        </Container>
    );
};

export default AdminPanelDevice;