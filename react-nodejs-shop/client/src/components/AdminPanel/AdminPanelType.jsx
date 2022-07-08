import React from 'react';
import {Button, Container, Form, Modal} from "react-bootstrap";
import {MENU_MODE} from "../../utils/constant";
import {useContext, useState} from "react";
import {Context} from "../../index";
import {addType, fetchTypes} from "../../http/storeAPI";
import {observer} from "mobx-react-lite";

const AdminPanelType =({setMode}) => {
    const {typeStore} = useContext(Context)
    const [typeTitle, setTypeTitle] = useState('')
    async function createType() {
        if (typeTitle) {
            const type = await addType(typeTitle)
            await fetchTypes().then(data => typeStore.setTypes(data))
        }
    }
    return (
        <Container>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создание типа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className={'d-flex flex-column gap-2'}>
                    <Form>
                        <Form.Control value={typeTitle} onChange={e => setTypeTitle(e.target.value)} placeholder={"Название типа"}/>
                    </Form>
                    <Button onClick={createType}> Создать</Button>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={e => setMode(MENU_MODE)}>Отмена</Button>
            </Modal.Footer>
        </Container>
    );
};

export default AdminPanelType;