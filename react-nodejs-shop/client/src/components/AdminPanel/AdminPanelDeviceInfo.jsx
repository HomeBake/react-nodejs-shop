import React from 'react';
import {Button, Container, Form, Modal} from "react-bootstrap";
import {useState} from "react";

const AdminPanelDeviceInfo = ({info, setInfo}) => {


    function addInfo() {
        setInfo([...info,{
            title: '',
            description: '',
            number: Date.now()
        }])
    }

    function deleteInfo(number) {
        setInfo(info.filter(spec => spec.number !== number))
    }

    function changeInfo(key, value, number) {
        setInfo(info.map((spec) => spec.number === number ? {...spec, [key]: value} : spec))
    }


    return (
        <>
            <Modal.Header>
                Информация о товаре
                <Button onClick={addInfo}>Добавить</Button>
            </Modal.Header>
            <Modal.Body>
                {info.map((spec) =>
                    <Container key={spec.number} className={'d-flex m-2 gap-2'}>
                        <Form.Control
                            placeholder={'Название'}
                            value={spec.title}
                            onChange={(e) => changeInfo('title', e.target.value, spec.number)}
                        />
                        <Form.Control
                            placeholder={'Значение'}
                            value={spec.description}
                            onChange={(e) => changeInfo('description', e.target.value, spec.number)}
                        />
                        <Button className={'btn btn-danger btn-sm w-25'} onClick={(e)=> deleteInfo(spec.number)}>
                            Удалить
                        </Button>
                    </Container>
                )}
            </Modal.Body>
        </>
    );
};

export default AdminPanelDeviceInfo;