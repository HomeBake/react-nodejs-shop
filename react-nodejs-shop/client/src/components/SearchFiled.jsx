import React, {useEffect, useState} from 'react';
import {Button, Form, Image} from "react-bootstrap";
import searchIcon from "../assets/search_icon.svg";
import useQuery from "../hooks/useQuery";

const SearchFiled = () => {
    const query = useQuery()
    const [search, setSearch] = useState(query.get('search'))
    return (
        <Form className={"d-flex mb-2"}>
            <Form.Control
                className={"rounded-0 rounded-start border-secondary"}
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
            />
            <Button className={"rounded-0 rounded-end"} variant={"outline-secondary"}>
                <Image src={searchIcon} width={"30px"}/>
            </Button>
        </Form>
    );
};

export default SearchFiled;