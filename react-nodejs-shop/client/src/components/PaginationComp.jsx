import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const PaginationComp = () => {
    const {pageStore} = useContext(Context)
    const pageTotal = Math.ceil(pageStore.itemTotal / pageStore.limit)
    const pages = []
    for (let i = 0; i < pageTotal; i++) {
        pages.push(i + 1)
    }

    
    return (
        <Pagination className={'mt-5 justify-content-center'}>

            {pageTotal > 1 && pages.map( page =>
            <Pagination.Item
                active={page === pageStore.page}
                key={page}
                onClick={() => pageStore.setPage(page)}
            >
                {page}
            </Pagination.Item>
            )}
        </Pagination>
    );
};

export default PaginationComp;