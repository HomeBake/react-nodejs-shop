import React, {useContext} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE, STORE_ROUTE} from "../utils/constant";
import {register, login} from "../http/userAPI";
import {Context} from "../index";
import useInput from "../hooks/useInput";
import jwtDecode from "jwt-decode";


const Auth = () => {
    const navigate = useNavigate()
    const isRegister = useLocation().pathname === REGISTER_ROUTE
    const emailInput = useInput('')
    const passwordInput = useInput('')
    const repeatPassInput = useInput('')
    const {userStore} = useContext(Context)

    function getUser(OKRes) {
        const token = OKRes.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token',token)
        userStore.setUser(user)
        userStore.setIsAuth(true)
        navigate(STORE_ROUTE)
    }

    function checkPass(password, repeatPassword) {
        return password === repeatPassword
    }

    const httpSend = async () => {
        let res
        if (isRegister) {
            if (checkPass(passwordInput.value,repeatPassInput.value)) {
                res = await register(emailInput.value,passwordInput.value)
                if (res.status === 200) {
                    getUser(res)
                }
                else {
                    console.log(res.data.message)
                }
            }
            else {
                console.log('Повторите пароль')
            }
        } else {
            res = await login(emailInput.value,passwordInput.value)
            if (res.status === 200) {
                getUser(res)
            }
            else {
                console.log(res.data.message)
            }
        }
        console.log(res)
    }

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
                        type='email'
                        className={"mt-2"}
                        placeholder={"Введите Email"}
                        {...emailInput}
                    />
                    <Form.Control
                        type="password"
                        className={"mt-2"}
                        placeholder={"Введите пароль"}
                        {...passwordInput}
                    />
                    {isRegister &&
                        <Form.Control
                            type="password"
                            className={"mt-2"}
                            placeholder={"Повторите пароль"}
                            {...repeatPassInput}
                        />
                    }
                    <Container className={"d-flex flex-row justify-content-end p-0"}>
                        {!isRegister
                            ?
                            <div>
                                Еще не зарегестрированы? <NavLink to={REGISTER_ROUTE}><u> Зарегистрироваться </u></NavLink>
                            </div>
                            :
                            <div className={"w-100"}>
                                Уже зарегестрированы? <NavLink to={LOGIN_ROUTE}><u> Войти! </u></NavLink>
                            </div>
                        }

                        <Button variant={"outline-danger"} className={"mt-2 ms-1 align-self-end"}>
                            Назад
                        </Button>
                        <Button
                            variant={"outline-success"}
                            className={"mt-2 ms-1 align-self-end"}
                            onClick={httpSend}
                        >
                            {isRegister ?
                                "Далее"
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