import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import SearchFiled from "../components/SearchFiled";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/storeAPI";
import useQuery from "../hooks/useQuery";
import OrderBar from "../components/OrderBar";

const Store = observer(() => {
    const {deviceStore,typeStore, brandStore,filterStore} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const query = useQuery()

    function parseUrl() {
        const typeId = query.get("typeId") || ''
        const brandId = query.get("brandId") || ''
        const search = query.get("search") || ''
        return [typeId, brandId, search]
    }

    useEffect( (e) => {
        fetchDevices(...parseUrl()
        ).then(data => deviceStore.setDevices(data)
        ).finally(() => setIsLoading(false))
        fetchTypes().then(data => typeStore.setTypes(data))
        fetchBrands().then(data => brandStore.setBrands(data))
    }, [])

    useEffect( (e) => {
        fetchDevices(
            typeStore.selectedType,
            brandStore.selectedBrand,
            query.get("search") || '',
            filterStore.selectedFilter,
        ).then(data => deviceStore.setDevices(data)
        ).finally(() => setIsLoading(false))
    }, [typeStore.selectedType,brandStore.selectedBrand,filterStore.selectedFilter])

    return (
        <Container className={"mt-4"}>
            <Row className={"mt-2"}>
                <Col md={3}>
                    <OrderBar/>
                    <TypeBar/>
                </Col>
                <Col md={9} >
                    <SearchFiled/>
                    <BrandBar/>
                    {isLoading ?
                        <Container
                            className={'d-flex justify-content-center align-items-center '}
                            style={{height: '80vh'}}
                        >
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Container>
                        : ''
                    }
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Store;