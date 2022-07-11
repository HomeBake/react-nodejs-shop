import React, {useContext, useState} from 'react';
import {Form} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";



const OrderBar = observer(() => {
    const {filterStore} = useContext(Context)
    const filters = filterStore.filters
    return (
        <Form className={'mb-3'}>
            <Form.Select value={filterStore.selectedFilter.title} onChange={e => filterStore.setSelectedFilter(e.target.value)}>
                <option>Выберите сортировку</option>
                {filters.map(({title,value},num) =>
                    <option key={num} value={value}> {title} </option>
                )}
            </Form.Select>
        </Form>
    );
});

export default OrderBar;