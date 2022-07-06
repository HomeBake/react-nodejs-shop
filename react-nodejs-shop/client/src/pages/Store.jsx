import React from 'react';
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import searchIcon from "../assets/search_icon.svg"
import SearchFiled from "../components/SearchFiled";

const Store = () => {
    return (
        <Container className={"mt-4"}>
            <Row className={"mt-2"}>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9} >
                    <SearchFiled/>
                    <BrandBar/>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    );
};

export default Store;