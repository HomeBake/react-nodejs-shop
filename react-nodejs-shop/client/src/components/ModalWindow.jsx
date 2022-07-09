import React, {useState} from 'react';
import {Button, Container, Modal} from "react-bootstrap";


const ModalWindow = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    );
};

export default ModalWindow;