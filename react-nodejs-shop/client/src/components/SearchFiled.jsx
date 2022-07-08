import React, {useContext} from 'react';
import {Button, Form, Image} from "react-bootstrap";
import searchIcon from "../assets/search_icon.svg";
import useQuery from "../hooks/useQuery";
import {fetchDevices} from "../http/storeAPI";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import useInput from "../hooks/useInput";

const SearchFiled = () => {
    const context = useContext(Context)
    const query = useQuery()
    const input = useInput(query.get('search') || "")
    const navigator = useNavigate()
    function getDevices() {
        fetchDevices(context.typeStore.selectedType, context.brandStore.selectedBrand,input.value).then(data => context.deviceStore.setDevices(data))
        let url = new URL(window.location)
        url.searchParams.set('search', input.value)
        input.value ? navigator(url.search) : navigator('')
    }

    return (
        <Form className={"d-flex mb-2"} onSubmit={(e) => e.preventDefault()}>
            <Form.Control
                className={"rounded-0 rounded-start border-secondary"}
                type="text"
                placeholder="Поиск..."
                {...input}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        getDevices()
                    }
                }}
            />
            <Button className={"rounded-0 rounded-end"} variant={"outline-secondary"} onClick={getDevices}>
                <Image src={searchIcon} width={"30px"}/>
            </Button>
        </Form>
    );
};

export default SearchFiled;