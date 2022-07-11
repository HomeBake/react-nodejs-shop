import React from 'react';
import Toast from 'react-bootstrap/Toast';

const Notification = ({title,text,show,setShow}) => {
    return (
        <Toast className={'align-self-center'} onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">{title}</strong>
                    </Toast.Header>
                    <Toast.Body>{text}</Toast.Body>
        </Toast>


    );
};

export default Notification;