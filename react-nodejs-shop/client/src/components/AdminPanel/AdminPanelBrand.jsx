import React, {useContext, useState} from 'react';
import {Button, Container, Form, Modal} from "react-bootstrap";
import {MENU_MODE} from "../../utils/constant";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchBrands,addBrand} from "../../http/storeAPI";

const AdminPanelBrand = observer(({setMode}) => {
    const {brandStore} = useContext(Context)
    const [brandTitle, setBrandTitle] = useState('')
    async function createBrand() {
        if (brandTitle) {
            const brand = await addBrand(brandTitle)
            await fetchBrands().then(data => brandStore.setBrands(data))
        }
    }

    return (
        <Container>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создание бренда
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className={'d-flex flex-column gap-2'}>
                    <Form>
                        <Form.Control value={brandTitle} onChange={e => setBrandTitle(e.target.value)} placeholder={"Название бренда"}/>
                    </Form>
                    <Button onClick={createBrand}> Создать</Button>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={e => setMode(MENU_MODE)}>Отмена</Button>
            </Modal.Footer>
        </Container>

    );
});

export default AdminPanelBrand;