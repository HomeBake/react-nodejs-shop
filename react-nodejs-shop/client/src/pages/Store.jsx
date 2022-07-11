import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Pagination, Row, Spinner} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import SearchFiled from "../components/SearchFiled";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/storeAPI";
import useQuery from "../hooks/useQuery";
import OrderBar from "../components/OrderBar";
import PaginationComp from "../components/PaginationComp";

const Store = observer(() => {
    const {deviceStore,typeStore, brandStore,filterStore,pageStore} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const query = useQuery()

    function parseUrl() {
        const typeId = query.get("typeId") || ''
        const brandId = query.get("brandId") || ''
        const search = query.get("search") || ''
        return [typeId, brandId, search]
    }

    const scrollHandler = (e) => {
        const pageTotal = Math.ceil(pageStore.itemTotal / pageStore.limit)
        if (pageStore.paginationType  && pageStore.page < pageTotal &&  (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)) {
            pageStore.setPage(pageStore.page + 1)
        }
    }

    useEffect( () => {
        pageStore.setPage(1)
        fetchDevices(...parseUrl()
        ).then(data => {
            pageStore.setItemTotal(data.count.length)
            }
        ).finally(() => setIsLoading(false))
        fetchTypes().then(data => typeStore.setTypes(data))
        fetchBrands().then(data => brandStore.setBrands(data))
        if (pageStore.paginationType) {
            document.addEventListener('scroll', scrollHandler)
            return function () {
                document.removeEventListener('scroll', scrollHandler)
            }
        }
    }, [])

    useEffect( () => {
        pageStore.setPage(1)
        fetchDevices(
            typeStore.selectedType,
            brandStore.selectedBrand,
            query.get("search") || '',
            filterStore.selectedFilter,
            pageStore.limit,
            pageStore.page,
        ).then(data => {
                deviceStore.setDevices(data.rows)
                pageStore.setItemTotal(data.count.length)
            }
        ).finally(() => setIsLoading(false))
        if (pageStore.paginationType) {
            document.addEventListener('scroll', scrollHandler)
            return function () {
                document.removeEventListener('scroll', scrollHandler)
            }
        }
    }, [pageStore.paginationType])

    useEffect( (e) => {
        pageStore.setPage(1)
        fetchDevices(
            typeStore.selectedType,
            brandStore.selectedBrand,
            query.get("search") || '',
            filterStore.selectedFilter,
            pageStore.limit,
            pageStore.page,
        ).then(data => {
                deviceStore.setDevices(data.rows)
                pageStore.setItemTotal(data.count.length)
            }
        ).finally(() => setIsLoading(false))
    }, [
        typeStore.selectedType,
        brandStore.selectedBrand,
        filterStore.selectedFilter,
    ])
    useEffect( () => {
        (pageStore.page !== 1 || !pageStore.paginationType) &&
        fetchDevices(
            typeStore.selectedType,
            brandStore.selectedBrand,
            query.get("search") || '',
            filterStore.selectedFilter,
            pageStore.limit,
            pageStore.page,
        ).then(data => {
            pageStore.paginationType
                ?
                deviceStore.setDevices([...deviceStore.devices,...data.rows])
                :
                deviceStore.setDevices(data.rows)
        }).finally(() => setIsLoading(false))
    }, [
        pageStore.page
    ])


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
                    {!pageStore.paginationType && <PaginationComp/>}
                </Col>
            </Row>
        </Container>
    );
});

export default Store;