import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE, STORE_ROUTE} from "../utils/constant";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
            <Navbar bg="dark" expand="lg" style={{height: "54px"}}>
                <Container>
                    <NavLink to={STORE_ROUTE} className={"text-white"}>Девайсы</NavLink>
                    {user.isAuth ?
                        <Nav className="ml-auto">
                            <Button className={"text-white m-1"}>Корзина</Button>
                            {user.user.role === "ADMIN" &&
                                <Button className={"text-white m-1"}>Управление</Button>
                            }
                            <Button className={"text-white m-1"} onClick={() => user.setIsAuth(false)}>Выйти</Button>
                        </Nav>
                        :
                        <Nav className="ml-auto">
                            <NavLink to={LOGIN_ROUTE}>
                                <Button className={"text-white m-1"}>Вход</Button>
                            </NavLink>
                            <NavLink to={REGISTER_ROUTE}>
                                <Button className={"text-white m-1"}>Регистрация</Button>
                            </NavLink>
                        </Nav>
                    }
                </Container>
            </Navbar>
    );
});

export default NavBar;