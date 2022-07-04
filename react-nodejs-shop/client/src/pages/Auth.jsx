import React, {useContext} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE} from "../utils/constant";
import {useLocation} from "react-router-dom";
import {Context} from "../index";

const Auth = () => {
    const isRegister = useLocation().pathname === REGISTER_ROUTE
    const {user} = useContext(Context);
    return (
        <Container
        className={"d-flex justify-content-center align-items-center"}
        style={{height: window.innerHeight - 54}}
        >
            <Card
                style={{width: "500px"}}
                className={"p-5"}
            >
                <h1 className={"m-auto pb-4"}>
                    {isRegister ?
                   "Регистрация"
                    :
                    "Вход"
                    }
                </h1>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Введите Email"}
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder={"Введите пароль"}
                    />
                    {isRegister &&
                        <Form.Control
                            className={"mt-2"}
                            placeholder={"Повторите пароль"}
                        />
                    }
                    <Container className={"d-flex flex-row justify-content-end p-0"}>
                        {!isRegister &&
                            <div>
                                Еще не зарегестрированы? <NavLink to={REGISTER_ROUTE}> Зарегистрироваться </NavLink>
                            </div>
                        }

                        <Button variant={"outline-danger"} className={"mt-2 ms-1 align-self-end"}>
                            Назад
                        </Button>
                        <Button
                            variant={"outline-success"}
                            className={"mt-2 ms-1 align-self-end"}
                            onClick={() => user.setIsAuth(true)}
                        >
                            {isRegister ?
                                "Зарегистрироваться"
                                :
                                "Войти"
                            }
                        </Button>
                    </Container>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;