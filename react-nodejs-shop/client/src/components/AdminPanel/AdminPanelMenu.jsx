import React from 'react';
import {Button, Container, Modal} from "react-bootstrap";
import {BRAND_MODE, DEVICE_MODE, TYPE_MODE} from "../../utils/constant";

const AdminPanelMenu = ({setMode,title}) => {
    return (
        <Container>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Управление
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className={'d-flex flex-column gap-2'}>
                    <Button variant={'outline-secondary'} onClick={e => setMode(TYPE_MODE)}>Добавить тип</Button>
                    <Button variant={'outline-secondary'} onClick={e => setMode(BRAND_MODE)}>Добавить бренд</Button>
                    <Button variant={'outline-secondary'} onClick={e => setMode(DEVICE_MODE)}>Добавить девайс</Button>
                </Container>
            </Modal.Body>
            <Modal.Footer/>
        </Container>
    );
};

export default AdminPanelMenu;