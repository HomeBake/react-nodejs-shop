import React, {useContext} from 'react';
import {Button, Container, ListGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const BrandBar = observer(() => {
    const {brandStore} = useContext(Context)
    return (
        <Container className={"d-flex flex-wrap p-0"}>
                {brandStore.brands.map((brand)=>
                    <Button
                        className={"m-1"}
                        style={{cursor: "pointer"}}
                        key={brand.id}
                        onClick={() => brandStore.setSelectedBrand(brand.id)}
                        active={brand.id === brandStore.selectedBrand}
                        variant={"secondary"}
                    >
                        {brand.name}
                    </Button>
                )}
        </Container>
    );
});

export default BrandBar;