import React, {useEffect, useState} from 'react';
import Input from "../mini/Input";
import {useDispatch, useSelector} from "react-redux";
import Button from "../mini/Button";
import _ from "lodash";
import {changePassword} from "../../store/actions/changePassword";
import {useQuery} from "../../utills/hooks/useQuery";
import {setSuperAdmin} from "../../store/actions/login";
import {useNavigate} from "react-router-dom";


const fields = [
    {
        id: 1,
        name: "password",
        label: "New password",
        validation: /^.{8,}$/,
        info: "Your password must be at least 8 characters long, or a mismatch.",
        maxLength: "20",
    },
    {
        id: 2,
        name: "repeatPassword",
        label: "Repeat New password",
        info: "Password don't match.",
    },

]


const Profile = () => {
    const dispatch = useDispatch()
    const status = useSelector(state => state.changePasswordAdmin.status)
    const statusGet = useSelector(state => state.login.statusUser)
    const {query, setQuery} = useQuery();
    const {q} = query
    const navigate = useNavigate()
    const [inputName, setInputName] = useState([]);
    const [isChange, setIsChange] = useState(false)
    const [anim, setAnim] = useState("")
    const [admin, setAdmin] = useState({
        password: "",
        repeatPassword: "",

    })

    const {password, repeatPassword} = admin

    const [userInfo, setUserInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = userInfo

    useEffect(() => {
        if (status === "ok") {
            const time = setInterval(() => {
                navigate("/")
                localStorage.removeItem("token")
                window.location.reload(true)
                dispatch(setSuperAdmin({}))
            }, 3000)
            return () => clearTimeout(time)
        }
    }, [status]);

    useEffect(() => {
        inputName.forEach((item) => {
            if (item === title && value.length) {
                test()
            }
        })
        if (password && repeatPassword && !inputName.length) {
            setIsChange(true)
        } else {
            setIsChange(false)
        }
    }, [admin, inputName.length]);

    const onChange = (event) => {
        let v = event.target.value;
        let n = event.target.name;

        setAdmin((prevState) => ({
            ...prevState,
            [n]: v
        }));
        setUserInfo({value: v, title: n});
    }

    const test = () => {
        let newInputName = [...inputName];
        fields.forEach(({validation, name}) => {
            if (name === title) {
                const isValid = validation ? validation.test(value) : true;
                if (!isValid || !value.length) {
                    console.log("if")
                    if (!newInputName.includes(name)) {
                        newInputName.push(name);
                    }
                } else {
                    if (admin.repeatPassword.length && admin.password !== admin.repeatPassword) {
                        if (!newInputName.includes("repeatPassword")) {
                            newInputName.push("repeatPassword");
                        }

                    } else if (/^.{8,}$/.test(admin.password) && admin.password === admin.repeatPassword) {
                        newInputName = newInputName.filter(item => item !== "repeatPassword" && item !== "password");
                    } else {
                        newInputName = newInputName.filter(item => item !== "repeatPassword");
                    }
                }
            }
        })
        setInputName(_.uniq(newInputName));
        return newInputName.length > 0;
    };

    const changeAdminPassword = (e) => {
        e.preventDefault();
        const hasErrors = test();
        if (hasErrors) {
            return;
        }
        if (isChange) {
            e.preventDefault();
            dispatch(changePassword({newPassword: password}));
        }
    }

    useEffect(() => {
        if (q === "change-password") {
            const time = setInterval(() => {
                setAnim(true)
            }, 350)
            return () => clearTimeout(time)
        }
    }, [q]);


    return (
        <div className="super-profile-change" style={{
            opacity: anim ? 1 : 0,
            zIndex: anim ? 9998 : -1
        }}>
            {statusGet === "pending" ? <div className="opacity-store"></div> : null}
            <div className="container-profile" style={{
                opacity: status === "pending" && !isChange ? 0.5 : 1,
                maxWidth: 400
            }}>
                {/*<div className="title-change">*/}
                {/*    <h2>*/}
                {/*        Change password*/}
                {/*    </h2>*/}
                {/*</div>*/}
                {isChange ?
                    <>
                        {status !== "" ? <div className="update-admin"></div> : null}
                        {status === "pending" ?
                            <div className="update-admin-block"><span className="update-admin-span">Password is being changed...</span>
                            </div> : null}
                        {status === "ok" ? <div className="update-admin-block"><span className="update-admin-span">Password changed</span>
                        </div> : null}
                    </>
                    : null}
                <form onSubmit={changeAdminPassword}>
                    {fields.map((field) => (
                        <div key={field.id} className="change">
                            <div>
                                <Input
                                    name={field.name}
                                    maxLength={field.maxLength}
                                    className={inputName.includes(field.name) ? "input-error" : "input"}
                                    {...field}
                                    onChange={onChange}
                                    onBlur={test}
                                    value={admin[field.name]}
                                    id={field.id}
                                    label={field.label}
                                    classNameLabel="label"
                                    status={status}
                                /></div>
                            <div className="validation-info-login">
                                {inputName.includes(field.name) ?
                                    <span>{field.info}</span>
                                    :
                                    null}
                            </div>
                        </div>
                    ))}
                    <div className="form-button-block">
                        <Button
                            status={isChange && status === "pending" ? "pending" : ""}
                            text="Change"
                            disabled={!isChange}
                            type={isChange ? "submit" : "button"}
                            className={isChange ? "active-button" : "disabled"}></Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Profile;
