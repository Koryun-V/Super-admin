import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Input from "../mini/Input";
import Button from "../mini/Button";
import _ from "lodash";
import {forgotPasswordUser, setStatusForgot} from "../../store/actions/login";
import ForgotPasswordChange from "./ForgotPasswordChange";


const fields = [
    {
        id: 1,
        name: "email",
        label: "E-mail",
        validation: /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/,
        info: "Please enter correct e-mail.",
    },
]


const ForgotPassword = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.login.statusForgot)
    const statusEmail = useSelector(state=>state.login.emailError)

    const [inputName, setInputName] = useState([]);
    const [isConfirm, setIsConfirm] = useState(false);
    const [email, setEmail] = useState("")
    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = userInfo

    useEffect(() => {
        if (inputName[0] === "email" && email.length) {
            test()
        }
        if (email) {
            setIsConfirm(true)
        } else {
            setIsConfirm(false)
        }
    }, [email, inputName.length]);

    const onChange = (event) => {
        let v = event.target.value
        let n = event.target.name
        setEmail(v);
        setUserInfo({value: v, title: n})
        if(status === "error"){
            dispatch(setStatusForgot(""))
        }
    }

    const test = () => {
        let newInputName = [...inputName];
        fields.forEach(({validation, name}) => {
            if (name === title) {
                let isValid = validation ? validation.test(value) : true;
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

    const login = (e) => {
        e.preventDefault();
        const hasErrors = test();
        if (hasErrors) {
            return;
        }
        if (email) {
            dispatch(forgotPasswordUser({email}))
        }
    }

    return (
        status !== "ok" ?
            <div className="container-form">
                <div className="title-login">
                    <h2>
                        Reset password
                    </h2>
                </div>

                <form onSubmit={login}>
                    <div key={fields[0].id} className="login">
                        <div>
                            <Input
                                name={fields[0].name}
                                className={inputName.includes("email") ? "input-error" : "input"}
                                onBlur={test}
                                onChange={onChange}
                                value={email[fields[0].name]}
                                id={fields[0].id}
                                label={fields[0].label}
                                classNameLabel="label"
                                status={status}
                            />
                        </div>

                        <div className="validation-info-login">
                            {status === "error" ?
                                <span>{statusEmail}</span>
                                :
                                inputName[0] === "email" ?
                                <span>{!email.length ? "Field Required" : fields[0].info}</span> : null}
                        </div>
                    </div>

                    <div className="form-button-block" style={{marginTop: 20}}>
                        <Button
                            status={status} text="RECEIVE CODE" type={isConfirm ? "submit" : "button"}
                            className={isConfirm && status !== "pending" ? "active-button"
                                : isConfirm && status === "pending" ? "pending-button" : "disabled"}>Text</Button>
                    </div>
                </form>
            </div>
            : <ForgotPasswordChange email={email}/>
    );
};

export default ForgotPassword;
