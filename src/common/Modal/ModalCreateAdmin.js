import React, {useCallback, useEffect, useState} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import Input from "../mini/Input";
import Button from "../mini/Button";
import {getAdmin, createAdmin, setStatusCreate, setCreateError} from "../../store/actions/admin";
import _ from "lodash"
import {ReactComponent as Close} from "../../assets/icon/close-x.svg"


const fields = [
    {
        id: 1,
        name: "email",
        label: "E-mail",
        validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        info: "Please enter correct e-mail.",
    },
]


function ModalCreateAdmin({open, onClose, id}) {
    const dispatch = useDispatch();
    const statusCreate = useSelector(state => state.admin.statusCreate);
    const status = useSelector(state => state.admin.status)
    const createError = useSelector(state => state.admin.createError)
    const [admin, setAdmin] = useState({
        email: ""
    })
    const [inputName, setInputName] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [storeInfo, setStoreInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = storeInfo
    const {email} = admin

    const scrollModal = () => {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('width');
        document.body.ontouchmove = () => true;
        window.removeEventListener("keydown", handleEsc)
    }

    const handleEsc = useCallback((event) => {
        if (event.keyCode === 27) {
            onClose();
        }
    }, []);


    useEffect(() => {
        inputName.forEach((item) => {
            if (item === title && value.length) {
                test()
            }
        })
        if (email && !inputName.length) {
            setIsCreate(true)
        } else {
            setIsCreate(false)
        }
    }, [admin, inputName.length]);

    useEffect(() => {
        if (statusCreate === "ok") {
            dispatch(getAdmin({id}))
        } else if (statusCreate === "error") {
            setIsCreate(false)
        }
    }, [statusCreate]);

    useEffect(() => {
        const time = setTimeout(() => {
            if (status === "ok" && statusCreate === "ok") {
                onClose()
            }
        }, 3000)
        return () => clearTimeout(time)

    }, [statusCreate, status]);

    useEffect(() => {
        if (open) {
            (async () => {
                try {
                    document.body.style.width = ` ${document.body.getBoundingClientRect().width}px`
                    document.body.style.overflowY = 'hidden';
                    document.body.ontouchmove = () => false;
                    window.addEventListener('keydown', handleEsc);

                } catch (err) {
                    console.log(err)
                }
            })()
        } else {
            scrollModal()
            dispatch(setStatusCreate(""))
            dispatch(setCreateError(""))

            setStoreInfo({
                value: "",
                title: ""
            })
            setInputName([])
            setIsCreate(false)
            setAdmin({
                email: ""
            })
        }
    }, [open]);

    const onChange = (event) => {
        let v = event.target.value;
        let n = event.target.name;
        setAdmin((prevState) => ({
            ...prevState,
            [n]: v
        }));
        setStoreInfo({value: v, title: n});
        if (statusCreate === "error") {
            dispatch(setStatusCreate(""))
            dispatch(setCreateError(""))
        }

    };

    const test = () => {
        let newInputName = [...inputName];
        fields.forEach(({validation, name}) => {
            if (name === title) {
                const isValid = validation ? validation.test(value) : true;
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

    const create = (e) => {
        e.preventDefault();
        const hasErrors = test();
        if (hasErrors) {
            return;
        }
        if (isCreate) {
            dispatch(createAdmin({email, storeId: id}))
        }
    }


    if (!open) return null
    return ReactDom.createPortal(
        <div id="modal">
            <div onClick={onClose} className="shadow">
            </div>
            <div id="modal_window">
                <div className="close">
                    <div className="title">
                        <span>Create admin</span>
                    </div>
                    <div className="close-block" onClick={onClose}>
                        <Close className="icon"/>
                    </div>
                </div>
                <div className="modal-block">
                    <div className="container-modal" style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "400px"
                    }}>
                        {statusCreate === "pending" || status === "pending" ?
                            <div className="create-loading"></div> : null}
                        {statusCreate === "ok" && status === "ok" ?
                            <span className="create-loading-span">Admin created</span>
                            :
                            status === "pending" || statusCreate === "pending" ?
                                <span
                                    className="create-loading-span">Creating the admin...</span>
                                : null}

                        <form onSubmit={create} style={{
                            width: "100%",
                            gap: 0,
                        }}>
                            {fields.map((field) => (
                                <div key={field.id} className="field-block" style={{
                                    width: "100%",
                                }}>
                                    <Input
                                        key={field.id}
                                        name={field.name}
                                        className={inputName.includes(field.name) || statusCreate === "error" ? "input-error" : "input"}
                                        classNameLabel="label"
                                        {...field}
                                        onBlur={test}
                                        onChange={onChange}
                                        value={admin[field.name]}
                                        // type={field.name === "password" && eye === faEyeSlash ? "password" : "text"}
                                        id={field.id}
                                        label={field.label}
                                        status={statusCreate}
                                    />
                                </div>
                            ))}
                            <div className="validation-info-login">
                                {statusCreate === "error" ?
                                    <span>{createError}</span>
                                    :
                                    inputName[0] === "email" ?
                                        <span>{!admin.email.length ? "Field Required" : fields[0].info}</span> : null}
                            </div>
                            <div className="button-create">
                                <Button
                                    status={isCreate && status === "pending" || statusCreate === "pending" ? "pending" : ""}
                                    type={isCreate ? "submit" : "button"}
                                    disabled={!isCreate}
                                    className={isCreate ? "active-button" : "disabled"}
                                >Create</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

ModalCreateAdmin.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    backdropBG: PropTypes.string,
    zIndex: PropTypes.number,
    overflowY: PropTypes.bool,
};

export default ModalCreateAdmin;
