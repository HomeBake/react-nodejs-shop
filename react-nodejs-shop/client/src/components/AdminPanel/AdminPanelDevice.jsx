import React from 'react';
import {Button, Container, Form, Modal} from "react-bootstrap";
import {MENU_MODE} from "../../utils/constant";
import {useContext, useState} from "react";
import {Context} from "../../index";
import {addBrand, fetchBrands} from "../../http/storeAPI";

const AdminPanelDevice = ({setMode}) => {
    const {deviceStore,brandStore,typeStore} = useContext(Context)
    const [deviceTitle, setDeviceTitle] = useState('')
    const [devicePrice, setDevicePrice] = useState('')
    const [deviceImg, setDeviceImg] = useState('')
    const [brandId, setBrandId] = useState('')
    const [typeId, setTypeId] = useState('')
    async function createDevice() {
        if (deviceTitle && devicePrice && deviceImg && brandId && typeId) {

        }
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
                        <Form.Control placeholder={'Название товара'}/>
                        <Form.Control  placeholder={'Стоимость'}/>
                        <Form.Control type='file'/>
                        <Form.Select>
                            <option>Выберите бренд</option>
                            {brandStore.brands.map((brand) =>
                                <option key={brand.id} value={brand.id}> {brand.name} </option>
                            )}
                        </Form.Select>
                        <Form.Select>
                            <option>Выберите тип</option>
                            {typeStore.types.map((type) =>
                                <option key={type.id} value={type.id}> {type.name} </option>
                            )}
                        </Form.Select>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={e => setMode(MENU_MODE)}>Отмена</Button>
            </Modal.Footer>
        </Container>
    );
};

export default AdminPanelDevice;