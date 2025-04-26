import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginUser, setSuperAdmin, setStatus} from "../store/actions/login";
import Input from "./mini/Input";
import Button from "./mini/Button";


const fields = [
    {
        id: 1,
        name: "email",
        label: "E-mail",
    },
    {
        id: 2,
        name: "password",
        label: "Password",
    },
]

const Login = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.login.status)
    const token = useSelector(state => state.login.token)
    const [isLogin, setIsLogin] = useState(false)

    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = userInfo

    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const {email, password} = user
    console.log(status,"status")
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token)
            window.location.reload(true);
        }
    }, [token]);

    useEffect(() => {
        if (email && password) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [user]);
    const onChange = (event) => {

        let v = event.target.value
        let n = event.target.name


        setUser((prevState) => (
            {...prevState, [event.target.name]: event.target.value}
        ))
        setUserInfo({value: v, title: n})
        if (status === "error") {
            dispatch(setStatus(""))
        }

    }
    const login = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(loginUser({email, password}))
        }
    }
    return (

        <div className="login-wrapper">
            <div className="container-form">
                <div className="title-login">
                    <h2>
                        Super admin
                    </h2>
                </div>
                <form onSubmit={login}>
                    {fields.map((field) => (
                        <div key={field.id} className="login">
                            <div>
                                <Input
                                    name={field.name}
                                    className="input"
                                    {...field}
                                    // onBlur={test}
                                    onChange={onChange}
                                    value={user[field.name]}
                                    // type={field.name === "password" && eye === faEyeSlash ? "password" : "text"}
                                    id={field.id}
                                    label={field.label}
                                    classNameLabel="label"
                                    status={status}

                                />
                            </div>


                        </div>
                    ))}
                    <div className="validation-info-login">
                        {status === "error" ?
                            <span>Wrong login or password.</span>
                            :
                            null}
                    </div>

                    <div className="form-button-block" style={{marginTop: 20}}>
                        <Button
                            status={status} text="LOGIN" type={isLogin ? "submit" : "button"}
                            className={isLogin && status !== "pending" ? "active-button"
                                : isLogin && status === "pending" ? "pending-button" : "disabled"}>Text</Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
