import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, Spinner} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {BASKET_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, STORE_ROUTE} from "../utils/constant";
import {observer} from "mobx-react-lite";
import {changeRole} from "../http/userAPI";
import jwtDecode from "jwt-decode";

const NavBar = observer(({toggle, loading}) => {
    const {userStore, pageStore} = useContext(Context)
    function logOut() {
        userStore.setIsAuth(false)
        userStore.resetUser()
        localStorage.removeItem('token')
    }

    function devChangeRole() {
        changeRole().then( (res) =>
            {
                userStore.userRole === 'ADMIN'
                    ?
                    userStore.setUserRole('USER' )
                    :
                    userStore.setUserRole('ADMIN')
                const token = res.token
                localStorage.setItem('token',token)
                const user = jwtDecode(token)
                userStore.setUser(user)
            }
        )
    }

    return (
            <Navbar bg="dark" expand="lg" style={{height: "54px"}}>
                <Container>
                    <NavLink to={STORE_ROUTE} className={"text-white"}>Девайсы</NavLink>
                    {userStore.isAuth ?
                        <Nav className="ml-auto d-flex align-items-center">
                            <NavLink to={BASKET_ROUTE}>
                                <Button className={"text-white m-1"}>Корзина</Button>
                            </NavLink>

                            {
                                loading && <Spinner animation="border" variant="light" />
                            }
                            {userStore.userRole === "ADMIN" &&
                                <Button className={"text-white m-1"} onClick={toggle}>Управление</Button>
                            }
                            <Button className={"text-white m-1"} onClick={logOut}>Выйти</Button>
                            {userStore.userRole === "ADMIN"
                                ?
                                <Button className={"text-white m-1"} onClick={devChangeRole}>Пересать быть админом</Button>
                                :
                                <Button className={"text-white m-1"} onClick={devChangeRole}>Стать админом</Button>
                            }
                            <Button className={"text-white m-1"} onClick={()=> pageStore.setPaginationType(!pageStore.paginationType) }>Сменить тип пагинации</Button>
                        </Nav>
                        :
                        <Nav className="ml-auto">
                            <NavLink to={LOGIN_ROUTE}>
                                <Button className={"text-white m-1"}>Вход</Button>
                            </NavLink>
                            <NavLink to={REGISTER_ROUTE}>
                                <Button className={"text-white m-1"}>Регистрация</Button>
                            </NavLink>
                            <Button className={"text-white m-1"} onClick={()=> pageStore.setPaginationType(!pageStore.paginationType) }>Сменить тип пагинации</Button>
                        </Nav>
                    }
                </Container>
            </Navbar>
    );
});

export default NavBar;