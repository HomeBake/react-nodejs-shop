import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE, STORE_ROUTE} from "../utils/constant";
import {observer} from "mobx-react-lite";

const NavBar = observer(({toggle}) => {
    const {userStore} = useContext(Context)
    function logOut() {
        userStore.setIsAuth(false)
        userStore.resetUser()
        localStorage.removeItem('token')
    }

    return (
            <Navbar bg="dark" expand="lg" style={{height: "54px"}}>
                <Container>
                    <NavLink to={STORE_ROUTE} className={"text-white"}>Девайсы</NavLink>
                    {userStore.isAuth ?
                        <Nav className="ml-auto">
                            <Button className={"text-white m-1"}>Корзина</Button>
                            {userStore.user.role === "ADMIN" &&
                                <Button className={"text-white m-1"} onClick={toggle}>Управление</Button>
                            }
                            <Button className={"text-white m-1"} onClick={logOut}>Выйти</Button>
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