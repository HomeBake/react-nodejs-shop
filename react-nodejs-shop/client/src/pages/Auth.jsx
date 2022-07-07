import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {REGISTER_ROUTE, STORE_ROUTE} from "../utils/constant";
import {useLocation} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {register, login, check} from "../http/userAPI";
import {Context} from "../index";


const Auth = () => {
    const navigate = useNavigate()
    const isRegister = useLocation().pathname === REGISTER_ROUTE
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
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
            if (checkPass(password,repeatPass)) {
                res = await register(email,password)
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
            res = await login(email,password)
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        className={"mt-2"}
                        placeholder={"Введите пароль"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isRegister &&
                        <Form.Control
                            type="password"
                            className={"mt-2"}
                            placeholder={"Повторите пароль"}
                            value={repeatPass}
                            onChange={(e) => setRepeatPass(e.target.value)}
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
                            onClick={httpSend}
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