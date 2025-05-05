import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginUser, setStatus} from "../store/actions/login";
import Input from "./mini/Input";
import Button from "./mini/Button";
import ForgotPassword from "./mini/ForgotPassword";
import _ from "lodash";


const fields = [
    {
        id: 1,
        name: "email",
        label: "E-mail",
        validation: /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/,
        info: "Please enter correct e-mail.",
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
    const [isForgot, setIsForgot] = useState(false)
    const [inputName, setInputName] = useState([]);

    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const {email, password} = user
    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = userInfo


    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token)
            window.location.reload(true);
        }
    }, [token]);

    useEffect(() => {
        inputName.forEach((item) => {
            if (item === title && value.length) {
                test()
            }
        })
        if (email && password) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [user, inputName.length]);

    const onChange = (event) => {
        let v = event.target.value;
        let n = event.target.name;
        setUser((prevState) => (
            {...prevState, [event.target.name]: event.target.value}
        ))
        setUserInfo({value: v, title: n});

        if (status === "error") {
            dispatch(setStatus(""))
        }
    }

    const login = (e) => {
        e.preventDefault();
        const hasErrors = test();
        if (hasErrors) {
            return;
        }
        if (email && password) {
            dispatch(loginUser({email, password}))
        }
    }

    const forgotPassword = () => {
        setIsForgot(true);
        setUser({
            email: "",
            password: ""
        })
    }

    const test = () => {
        let newInputName = [...inputName];
        fields.forEach(({validation, name}) => {
            if (name === title) {
                let isValid = true;
                if (name === "email") {
                    isValid = validation ? validation.test(value) : true;
                }
                if (!isValid || !value.length) {
                    if (!newInputName.includes(name)) {
                        newInputName.push(name);
                    }
                } else {
                    newInputName = newInputName.filter(item => item !== name);
                }
            }
        });
        setInputName(_.uniq(newInputName));
        return newInputName.length > 0;
    };

    return (
        <div className="login-wrapper">
            {!isForgot ?
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
                                        className={inputName.includes(field.name) ? "input-error" : "input"}
                                        {...field}
                                        onBlur={field.name === "email" ? test : null}
                                        onChange={onChange}
                                        value={user[field.name]}
                                        // type={field.name === "password" && eye === faEyeSlash ? "password" : "text"}
                                        id={field.id}
                                        label={field.label}
                                        classNameLabel="label"
                                        status={status}
                                    />
                                </div>
                                <div className="validation-info-login">
                                    {field.name === "email" ?
                                        <>
                                        {inputName.includes(field.name) ?
                                            <span>{field.info}</span> : null}
                                        </>
                                        : status === "error" ?
                                            <span>Wrong login or password.</span>
                                            : null}
                                </div>
                            </div>
                        ))}

                        <div className="forgot-block">
                            <span onClick={forgotPassword}>Forgot password ?</span>
                        </div>
                        <div className="form-button-block" style={{marginTop: 20}}>
                            <Button
                                status={status} text="LOGIN" type={isLogin ? "submit" : "button"}
                                className={isLogin && status !== "pending" ? "active-button"
                                    : isLogin && status === "pending" ? "pending-button" : "disabled"}>Text</Button>
                        </div>
                    </form>
                </div>
                :
                <ForgotPassword/>
            }
        </div>
    );
};

export default Login;
