import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import Input from "../mini/Input";
import Button from "../mini/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faPlus} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash"
import {ReactComponent as Close} from "../../assets/icon/close-x.svg"
import {useQuery} from "../../utills/hooks/useQuery";
import {setCreateError} from "../../store/actions/admin";
import {createCategory, getCategories, setStatus, setStatusCreate} from "../../store/actions/categories";


const fields = [
    {
        id: 1,
        name: "name",
        label: "Name",
        validation: /^(?=.*[A-Za-z])[A-Za-z0-9.-]+(?: [A-Za-z0-9.-]+)?$/,
        maxLength: "20",
    },
    {
        id: 2,
        name: "logo",
        label: "Image",
        validation: "none",
    },

]


function ModalCreateCategory({open, onClose, categories}) {
    const dispatch = useDispatch();
    const status = useSelector(state => state.categories.status)
    const statusCreate = useSelector(state => state.categories.statusCreate);

    const inputRef = useRef(null)

    const [category, setCategory] = useState({
        name: "",
    })
    const {name} = category
    const [isImage, setIsImage] = useState(false);
    const [visualImage, setVisualImage] = useState("");
    const [image, setImage] = useState({});

    const {query, setQuery} = useQuery();
    const {q} = query
    const [id, setId] = useState("")
    const [inputName, setInputName] = useState([]);
    const [isCreate, setIsCreate] = useState(false);

    const [storeInfo, setStoreInfo] = useState({
        value: "",
        title: ""
    })
    const {value, title} = storeInfo

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
                test();
            }
        });

        const isAllFilled = name && visualImage
        const hasErrors = inputName.length > 0;

        if (!hasErrors && isAllFilled) {
            setIsCreate(true);
        } else {
            setIsCreate(false);
        }
    }, [name, inputName.length, visualImage, isCreate]);

    useEffect(() => {
        if (statusCreate === "ok") {
            dispatch(getCategories())
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
            categories = []
            dispatch(setStatusCreate(""))
            dispatch(setStatus(""))

            scrollModal()
            setCategory("")
            setStoreInfo({
                value: "",
                title: ""
            })
            setInputName([])
            setIsCreate(false)
            setImage({})
            setVisualImage("")
            setId("")
            setIsImage(false)
        }
    }, [open, q]);

    const onChange = (event) => {
        let v = event.target.value;
        let n = event.target.name;
        setCategory((prevState) => ({
            ...prevState,
            [n]: v
        }));
        setStoreInfo({value: v, title: n});
        if (statusCreate === "error") {
            dispatch(setStatusCreate(""))
            dispatch(setCreateError(""))
        }
    };

    useEffect(() => {
        const time = setTimeout(() => {
            if (status === "ok" && statusCreate === "ok") {
                onClose()
            }
        }, 3000)
        return () => clearTimeout(time)

    }, [statusCreate, status]);

    const onChangeImage = (event) => {
        const file = event.target.files[0];
        setImage(file)
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVisualImage(reader.result)
            };
            reader.readAsDataURL(file);
        }
        return setIsImage(true)
    }

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
        setId("")

        if (hasErrors) {
            return;
        }

        if (isCreate) {
            dispatch(createCategory({name, categoryImage: image}))
        }
    }


    if (!open) return null
    return ReactDom.createPortal(
        <div id="modal">
            <div className="shadow">
            </div>
            <div id="modal_window">
                <div className="close">
                    <div className="title">
                        <span>Create category</span>
                    </div>
                    <div className="close-block" onClick={onClose}>
                        <Close className="icon"/>
                    </div>
                </div>
                <div className="modal-block">
                    <div className="container-modal" style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "350px"
                    }}>
                        {statusCreate !== "" || status === "pending" ?
                            <div className="create-loading"></div> : null}
                        {statusCreate === "ok" && status === "ok" ?
                            <span className="create-loading-span">Category created</span>
                            :
                            status === "pending" || statusCreate === "pending" ?
                                <span
                                    className="create-loading-span">Creating the category...</span>
                                : null}

                        <form onSubmit={create} style={{
                            flexDirection: "column"
                        }}>

                            {fields.map((field) => (
                                <div key={field.id} className={field.name === "logo" ? "category-image" : "field-block"}
                                     style={{
                                         width: 350,
                                         height: field.name === "logo" ? 328 : 78
                                     }}
                                >

                                    <Input
                                        maxLength={field.maxLength}
                                        inputRef={inputRef}
                                        disabled={categories && id !== field.id}
                                        key={field.id}
                                        name={field.name}
                                        className={inputName.includes(field.name) ? "input-error" : "input"}
                                        classNameLabel="label"
                                        {...field}

                                        onBlur={() => {
                                            test()
                                            setId("")
                                        }}
                                        onChange={field.name === "logo" ? onChangeImage : onChange}
                                        value={field.name === "logo" ? undefined : name}
                                        id={field.id}
                                        label={field.label}
                                        status={statusCreate}
                                    />
                                    {field.name === "logo" ?
                                        <label id="98"
                                               tabIndex={2}
                                               onBlur={() => {
                                                   document.getElementById(98).style.borderColor = ""
                                               }}
                                               onClick={() =>
                                                   document.getElementById(98).style.borderColor = "2px solid #00d143"

                                               } htmlFor={categories ? "" : "2"}

                                               className={categories ? "disabled-custom-input" : "custom-input"}
                                               style={{
                                                   border: id === 2 ? "2px solid #00d143" : "",
                                                   height: 328,
                                               }}>
                                            {visualImage || categories ?
                                                <img
                                                    src={categories && !isImage ? categories.categoryImage[0].path : visualImage}
                                                    className="visual-logo"/> :
                                                <div className="image-plus">
                                                    <div className="image-plus-icon-block" style={{
                                                        width:150,
                                                        height:150,
                                                        borderRadius:120,

                                                    }}>
                                                        <FontAwesomeIcon icon={faPlus} className="image-plus-icon" style={{
                                                            fontSize:120,
                                                        }}/>
                                                    </div>
                                                    <FontAwesomeIcon icon={faImage} className="image-icon" style={{
                                                        fontSize:220,
                                                    }}/>
                                                </div>
                                            }
                                        </label> : null}
                                </div>
                            ))}
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

ModalCreateCategory.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    backdropBG: PropTypes.string,
    zIndex: PropTypes.number,
    overflowY: PropTypes.bool,
};

export default ModalCreateCategory;
