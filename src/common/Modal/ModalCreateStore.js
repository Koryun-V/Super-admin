import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import Input from "../mini/Input";
import Button from "../mini/Button";
import {createStore, getStores, setStatusCreate, updateStore} from "../../store/actions/store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faPlus, faSquarePen} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash"
import {ReactComponent as Close} from "../../assets/icon/close-x.svg"
import {flattenObject} from "../mini/Obj";


const fields = [
    {
        id: 1,
        name: "name",
        label: "Name",
        validation: /^[a-zA-Z0-9][a-zA-Z0-9()., ]*$/
        ,
    },
    {
        id: 2,
        name: "city",
        label: "City",
        validation: /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/,
    },
    {
        id: 3,
        name: "country",
        label: "Country",
        validation: /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/,
    },
    {
        id: 4,
        name: "logo",
        label: "Logo",
    },
    {
        id: 5,
        name: "latitude",
        label: "Latitude",
        validation: /^\d*\.?\d+$/,
    },
    {
        id: 6,
        name: "longitude",
        label: "Longitude",
        validation: /^\d*\.?\d+$/,
    },

]


function ModalCreateStore({open, onClose, stores}) {
    const dispatch = useDispatch();
    const status = useSelector(state => state.store.status)
    const statusCreate = useSelector(state => state.store.statusCreate);

    const [store, setStore] = useState({
        name: "",
        city: "",
        country: "",
        latitude: "",
        longitude: "",
    })
    const [isStore, setIsStore] = useState(false)
    const [id, setId] = useState("")
    const [logo, setLogo] = useState({});
    const [visualLogo, setVisualLogo] = useState("");
    const [inputName, setInputName] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [isLogo, setIsLogo] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false)
    const inputRef = useRef(null)
    const [storeInfo, setStoreInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = storeInfo
    const {name, city, country, latitude, longitude} = store

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
        if (stores && status === "ok") {
            setIsStore(true);
            setStore(flattenObject(stores))
        } else {
            setIsStore(false)
        }
    }, [status, stores]);

    useEffect(() => {
        inputName.forEach((item) => {
            if (item === title && value.length) {
                test()
            }
        })
        let log = stores ? logo : visualLogo
        if (name && city && country && log && latitude && longitude && !inputName.length) {
            setIsCreate(true)
        } else {
            setIsCreate(false)
        }
    }, [store, inputName.length, visualLogo, isCreate]);

    useEffect(() => {
        if (statusCreate === "ok") {
            dispatch(getStores())
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
            stores = []
            dispatch(setStatusCreate(""))
            scrollModal()
            setStore({
                name: "",
                city: "",
                country: "",
                latitude: "",
                longitude: "",
            })
            setStoreInfo({
                value: "",
                title: ""
            })
            setInputName([])
            setIsUpdate(false)
            setIsCreate(false)
            setLogo({})
            setVisualLogo("")
            setId("")
            setIsLogo(false)
        }
    }, [open]);

    const onChange = (event) => {
        let v = event.target.value;
        let n = event.target.name;
        const numberRegex = /^-?\d*(\.\d*)?$/;

        if (n === "latitude" || n === "longitude") {
            if (v === '' || numberRegex.test(v)) {
                setStore((prevState) => ({
                    ...prevState,
                    [n]: v
                }));
                setStoreInfo({value: v, title: n});
            }
        } else {
            setStore((prevState) => ({
                ...prevState,
                [n]: v
            }));
            setStoreInfo({value: v, title: n});
        }
        setIsUpdate(true)
    };

    const onChangeLogo = (event) => {
        const file = event.target.files[0];
        setLogo(file)
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVisualLogo(reader.result)
            };
            reader.readAsDataURL(file);
        }
        setIsUpdate(true)
        return setIsLogo(true)
    }

    const test = () => {
        let newInputName = [...inputName];
        fields.forEach(({validation, name}) => {
            if (name === title) {
                let isValid = name !== "logo" ? validation.test(value) : true;
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
    }

    const create = (e) => {
        e.preventDefault();
        const hasErrors = test();
        setId("")
        if (hasErrors) {
            return;
        }
        if (isCreate) {
            if (isStore) {
                dispatch(updateStore({id: stores.id, name, city, country, latitude, longitude, logo}));
            } else {
                dispatch(createStore({name, city, country, latitude, longitude, logo}));
            }
        }
    }

    const update = async (id) => {
        await setId(id)
        if (id === 4) {
            await document.getElementById(id).focus();
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
                        <span>{stores ? "Update store" : "Create store"}</span>
                    </div>
                    <div className="close-block" onClick={onClose}>
                        <Close className="icon"/>
                    </div>
                </div>
                <div className="modal-block">
                    <div className="container-modal" style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        {statusCreate !== "" && status !== "" ? <div className="create-loading"></div> : null}
                        {statusCreate === "ok" && status === "ok" ?
                            <span
                                className="create-loading-span">{stores ? "Store updated" : "Store created"}</span> :
                            statusCreate === "pending" || status === "pending" ?
                                <span
                                    className="create-loading-span">{stores ? "The store is updating..." : "Creating the store..."}</span>
                                : null}

                        <form onSubmit={create}>
                            {fields.map((field) => (
                                <div key={field.id} className="field-block">
                                    {stores ?
                                        <>
                                            {field.id === 4 ?
                                                <label htmlFor="4"
                                                       className={field.id === id ? "update-pencil-active" : "update-pencil"}
                                                       onClick={() => update(field.id)}>
                                                    <FontAwesomeIcon icon={faSquarePen}
                                                                     className={"update-pencil-icon"}/>
                                                </label>
                                                :
                                                <div
                                                    className={field.id === id ? "update-pencil-active" : "update-pencil"}
                                                    onClick={() => update(field.id)}>
                                                    <FontAwesomeIcon icon={faSquarePen}
                                                                     className={"update-pencil-icon"}/>
                                                </div>}
                                        </>
                                        :
                                        null}
                                    <Input
                                        inputRef={inputRef}
                                        disabled={stores && id !== field.id}
                                        key={field.id}
                                        name={field.name}
                                        className={inputName.includes(field.name) ? "input-error" : "input"}
                                        classNameLabel="label"
                                        {...field}

                                        onBlur={() => {
                                            test()
                                            setId("")
                                        }}
                                        onChange={field.name === "logo" ? onChangeLogo : onChange}
                                        value={store[field.name]}
                                        id={field.id}
                                        label={field.label}
                                        status={statusCreate}
                                    />
                                    {field.name === "logo" ?
                                        <label id="99"
                                               tabIndex={0}
                                               onBlur={() => {
                                                   document.getElementById(99).style.borderColor = ""
                                               }}
                                               onClick={() =>
                                                   document.getElementById(99).style.borderColor = "2px solid #00d143"

                                               } htmlFor={stores ? "" : "4"}
                                               className={stores ? "disabled-custom-input" : "custom-input"}
                                               style={{
                                                   border: id === 4 ? "2px solid #00d143" : "",
                                               }}>
                                            {visualLogo || stores ?
                                                <img src={stores && !isLogo ? stores.storeLogo[0].path : visualLogo}
                                                     className="visual-logo"/> :
                                                <div className="image-plus">
                                                    <div className="image-plus-icon-block">
                                                        <FontAwesomeIcon icon={faPlus} className="image-plus-icon"/>
                                                    </div>
                                                    <FontAwesomeIcon icon={faImage} className="image-icon"/>
                                                </div>
                                            }
                                        </label> : null}
                                </div>
                            ))}
                            <div className="button-create">
                                {stores ?
                                    <Button
                                        status={isCreate && status === "pending" || statusCreate === "pending" ? "pending" : ""}
                                        type={isCreate && isUpdate ? "submit" : "button"}
                                        disabled={!isUpdate && !isCreate}
                                        className={isUpdate && isCreate ? "active-button" : "disabled"}
                                    >Update</Button> :
                                    <Button
                                        status={isCreate && status === "pending" || statusCreate === "pending" ? "pending" : ""}
                                        type={isCreate ? "submit" : "button"}
                                        disabled={!isCreate}
                                        className={isCreate ? "active-button" : "disabled"}
                                    >Create</Button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

ModalCreateStore.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    backdropBG: PropTypes.string,
    zIndex: PropTypes.number,
    overflowY: PropTypes.bool,
};

export default ModalCreateStore;
