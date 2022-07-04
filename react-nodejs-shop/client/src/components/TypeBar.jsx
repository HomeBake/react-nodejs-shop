import React, {useContext} from 'react';
import {Container, ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const TypeBar = observer(() => {
    const {typeStore} = useContext(Context)
    return (
        <Container>
            <ListGroup>
                {typeStore.types.map((type) =>
                    <ListGroup.Item
                        action
                        style={{cursor: "pointer"}}
                        key={type.id}
                        variant="secondary"
                        onClick={() => typeStore.setSelectedType(type.id)}
                        active={type.id === typeStore.selectedType}
                    >
                        {type.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    );
});

export default TypeBar;