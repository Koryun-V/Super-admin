import React, {useCallback, useEffect, useState} from 'react';
import Input from "./mini/Input";
import {deleteAdminAvatar, setStatus, updateAdminInfo} from "../store/actions/updateAdmin";
import {useDispatch, useSelector} from "react-redux";
import Button from "./mini/Button";
import RadioButton from "./mini/RadioButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faPlus, faRotate, faSquarePen, faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import {getUser} from "../store/actions/login";
import {clear} from "@testing-library/user-event/dist/clear";


const fields = [
    {
        id: 1,
        name: "firstName",
        label: "First name",
        validation: /^[a-zA-Z]{2,20}$/,
        maxLength: "20",
    },
    {
        id: 2,
        name: "email",
        label: "E-mail",
    },
    {
        id: 3,
        name: "lastName",
        label: "Last name",
        validation: /^[a-zA-Z]{2,20}$/,
        maxLength: "30",
    },
    {
        id: 4,
        name: "createdAt",
        label: "Created at",
    },
    {
        id: 5,
        name: "updatedAt",
        label: "Updated at",
    },


]

const genderOptions = [
    {value: 'male', label: 'Male'},
    {value: 'female', label: 'Female'},
];
const Profile = () => {
        const dispatch = useDispatch()
        const [id, setId] = useState("")
        const [inputName, setInputName] = useState([]);
        const [isUpdate, setIsUpdate] = useState(false)
        const adminInfo = useSelector(state => state.login.user);
        const [isUpdateAdmin, setIsUpdateAdmin] = useState(false)
        const status = useSelector(state => state.updateAdmin.status)
        const [visualAvatar, setVisualAvatar] = useState("")
        const [isAvatar, setIsAvatar] = useState(false)
        const [avatar, setAvatar] = useState([]);
        const [isDeleteAvatar, setIsDeleteAvatar] = useState(false)
        const statusGet = useSelector(state => state.login.statusUser)
        const [rotate, setRotate] = useState(0)
        const [isAnim, setIsAnim] = useState(false)
        const [admin, setAdmin] = useState({
            firstName: "",
            lastName: "",
            email: "",
            gender: "",

        })
        const {firstName, lastName, gender} = admin
        const [userInfo, setUserInfo] = useState({
            value: "",
            title: ""
        })
        const {value, title} = userInfo

        console.log(avatar, 'qqqq')
        const formatDate = (date) => {
            const format = new Date(date)
            const day = format.getDate()
            const month = format.getMonth()
            const year = format.getFullYear()
            return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`
        }
        useEffect(() => {
            getInfo()
        }, [statusGet, adminInfo]);


        const getInfo = () => {
            if (statusGet === "ok" && adminInfo) {
                setAdmin({
                    firstName: adminInfo.firstName,
                    lastName: adminInfo.lastName,
                    email: adminInfo.email,
                    gender: adminInfo.gender,
                    createdAt: formatDate(adminInfo.createdAt),
                    updatedAt: formatDate(adminInfo.updatedAt)
                })
                setAvatar(adminInfo.avatar[0] ? adminInfo.avatar : [])
            }
        }


        useEffect(() => {
            if (status === "ok") {
                dispatch(getUser())
            }
        }, [status]);
        useEffect(() => {
            if (status === "ok" && statusGet === "ok") {
                const time = setTimeout(() => {
                    dispatch(setStatus(""))
                    setIsUpdate(false)
                    setIsUpdateAdmin(false)
                }, 2)
                return () => clearTimeout(time)
            }
        }, [status, statusGet]);


        useEffect(() => {
            inputName.forEach((item) => {
                if (item === title && value.length) {
                    test()
                }
            })
            if (firstName && lastName && !inputName.length) {
                setIsUpdateAdmin(true)
            } else {
                setIsUpdateAdmin(false)
            }
        }, [admin, inputName.length]);

        const onChange = useCallback((event) => {
            let v = event.target.value;
            let n = event.target.name;

            setAdmin((prevState) => ({
                ...prevState,
                [n]: v
            }));
            setUserInfo({value: v, title: n});
            setIsUpdate(true)
        }, [avatar]);


        const onChangeAvatar = (event, is) => {
            const file = event.target.files[0];
            setAvatar(file)

            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setVisualAvatar(reader.result)
                };
                reader.readAsDataURL(file);
            }
            if(!inputName.length){
                setIsUpdateAdmin(true)
            }
            setIsUpdate(true)
            setIsAvatar(true)
            return () => setIsAvatar(true)
        }

        const reloadAnim = () => {
            const time = setTimeout(() => {
                setRotate(rotate => rotate + 1)
            }, 0.9)
            return () => clearTimeout(time)
        }

        useEffect(() => {
            if (isAnim) {
                reloadAnim()
            }
            if (rotate === 540) {
                setIsAnim(false)
                setRotate(0)
            }
        });

        const test = () => {
            let newInputName = [...inputName];
            fields.forEach(({validation, name}) => {
                if (name === title) {
                    let isValid = true;
                    if (name === "lastName" || name === "firstName") {
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
        const deleteAvatar = ()=>{
            setIsUpdate(true)
            setAvatar([])
            setVisualAvatar("")
            if(!inputName.length){
                setIsUpdateAdmin(true)
            }
        }
        const register = (e) => {
            setId("")
            e.preventDefault();
            const hasErrors = test();
            if (hasErrors) {
                return;
            }
            if (isUpdateAdmin) {
                e.preventDefault();
                if (isAvatar) {
                    dispatch(updateAdminInfo({firstName, lastName, gender, avatar:avatar[0]}))
                } else {
                    dispatch(updateAdminInfo({firstName, lastName, gender}))
                    dispatch(deleteAdminAvatar())
                }
            }
        }

        const update = async (id) => {
            await setId(id)
            await document.getElementById(id).focus();
        }

    console.log(avatar,"avatar",visualAvatar)
        return (
            <div className="section">
                <div className="container">
                    <div className="super-profile">

                        <div className="container-profile">
                            <div className={isAnim ? "profile-reload-active" : "profile-reload"} onClick={() => {
                                getInfo()
                                setIsUpdate(false)
                                setIsUpdateAdmin(false)
                                setIsAnim(true)
                                setVisualAvatar("")
                                setIsAvatar(false)
                            }}>
                                <FontAwesomeIcon icon={faRotate} className="icon" style={{
                                    transform: `rotate(${rotate}deg)`
                                }}/>
                            </div>

                            <div className="super-admin-container-p">
                                {statusGet === "ok" ?
                                    <div className="super-admin-p">
                                        <div className="user-img-p">
                                            {visualAvatar || avatar.length ?
                                                <div className="user-img-container-p">
                                                    <img src={avatar[0] && !isAvatar ? avatar[0].path : visualAvatar}/>
                                                    <div className="delete-avatar" onClick={deleteAvatar}>
                                                        <FontAwesomeIcon icon={faTrash} className="icon"/>
                                                    </div>

                                                </div>

                                                :
                                                <div className="user-img-container-custom-p">
                                                    <FontAwesomeIcon icon={faUser} className="icon"/>
                                                </div>
                                            }

                                            <div className="add-avatar">
                                                <label htmlFor="100" className="add-img">
                                                    <FontAwesomeIcon icon={visualAvatar || avatar[0] ? faPencil : faPlus}
                                                                     className="icon"/>
                                                </label>
                                                <input accept=".jpg, .jpeg, .png"
                                                       type="file" id="100" onChange={onChangeAvatar}/>
                                            </div>


                                        </div>
                                        <div className="user-name-p">
                                            <span>{adminInfo.lastName.charAt(0).toUpperCase() + adminInfo.lastName.slice(1)} {adminInfo.firstName.charAt(0).toUpperCase() + adminInfo.firstName.slice(1)}</span>
                                            <span>{adminInfo.email}</span>
                                        </div>
                                    </div>
                                    :
                                    <div className="super-admin-p">
                                        <div className="user-img-p">
                                            <div className="user-img-container-custom-loading-p loading-gradient">
                                            </div>
                                        </div>
                                        <div className="user-name-p">
                                            <span className="loading-gradient" style={{height: 30}}></span>
                                            <span className="loading-gradient" style={{height: 30}}></span>
                                        </div>
                                    </div>}
                            </div>
                            {isUpdate ?
                                <>
                                    {status === "pending" || statusGet === "pending" ?
                                        <div className="update-admin"></div> : null}
                                    {status === "pending" ?
                                        <div className="update-admin-block"><span className="update-admin-span">Updating profile...</span>
                                        </div> : null}
                                    {statusGet === "pending" ? <div className="update-admin-block"><span
                                        className="update-admin-span">Profile updated</span></div> : null}
                                </>
                                : null}
                            <form onSubmit={register}>


                                {fields.map((field) => (
                                    <div key={field.id} className="update">
                                        {field.name === "firstName" || field.name === "lastName" ?
                                            <div
                                                className={field.id === id ? "update-pencil-active" : "update-pencil"}
                                                onClick={() => update(field.id)}>
                                                <FontAwesomeIcon icon={faSquarePen}
                                                                 className={"update-pencil-icon"}/>
                                            </div>
                                            : null}
                                        <div>
                                            <Input
                                                disabled={id !== field.id}
                                                name={field.name}
                                                maxLength={field.maxLength}
                                                className={inputName.includes(field.name) ? "input-error" : "input"}
                                                {...field}
                                                onChange={field.name === "firstName" || field.name === "lastName" ? onChange : null}
                                                onBlur={() => {
                                                    test()
                                                    setId("")
                                                }}
                                                value={admin[field.name]}
                                                id={field.id}
                                                label={field.label}
                                                classNameLabel="label"

                                            /></div>
                                    </div>

                                ))}

                                <div className="gender-radio-group">
                                    <div
                                        className={6 === id ? "update-pencil-active" : "update-pencil"}
                                        onClick={() => update(6)}>
                                        <FontAwesomeIcon icon={faSquarePen}
                                                         className={"update-pencil-icon"}/>
                                    </div>
                                    <span>Gender</span>
                                    <div className="gender-block" id="6"
                                         tabIndex={1}
                                         onBlur={() => {
                                             document.getElementById(6).style.borderColor = ""
                                             setId("")

                                         }}
                                         onClick={() =>
                                             document.getElementById(6).style.borderColor = "2px solid #00d143"

                                         }
                                         style={{
                                             border: id === 6 ? "2px solid #00d143" : "",
                                         }}

                                    >
                                        {genderOptions ? genderOptions.map((option) => (
                                            <RadioButton
                                                style={{
                                                    cursor: id === 6 ? "pointer" : "default",
                                                }}
                                                disabled={id !== 6}
                                                key={option.value}
                                                name="gender"
                                                value={option.value}
                                                checked={admin.gender === option.value}
                                                onChange={onChange}
                                                label={option.label}
                                            />
                                        )) : null}
                                    </div>
                                </div>

                                <div className="form-button-block" style={{marginTop: 20}}>
                                    <Button
                                        status={isUpdate && status === "pending" || isUpdate && statusGet === "pending" ? "pending" : ""}
                                        text="Update"
                                        disabled={!isUpdate && !isUpdateAdmin}
                                        type={isUpdateAdmin && isUpdate ? "submit" : "button"}
                                        className={isUpdate && isUpdateAdmin ? "active-button" : "disabled"}>Update</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default Profile;
