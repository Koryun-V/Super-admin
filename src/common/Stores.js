import React, {useEffect, useState} from 'react';
import {getStores} from "../store/actions/store";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSquarePen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import ModalCreateStore from "./Modal/ModalCreateStore";
import ModalDeleteStore from "./Modal/ModalDeleteStore";
import {RotatingLines} from "react-loader-spinner";
import {setBuyers, setStatistics} from "../store/actions/statistics";

const Stores = () => {
    const dispatch = useDispatch();
    const stores = useSelector(state => state.store.stores)
    const status = useSelector(state => state.store.status)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [indexS, setIndexS] = useState("")
    const [indexD, setIndexD] = useState("")
    const [store, setStore] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
        dispatch(setStatistics([]))
        dispatch(setBuyers([]))
        dispatch(getStores())
    }, []);

    const update = (index) => {
        setIsOpen(true)
        setIndexS(index)
    }

    const deleteStore = (id, name, index) => {
        setIsOpenDelete(true)
        setId(id)
        setIndexD(index)
        setStore(name)
    }


    return (
        <div className="section">
            <div className="store-header">
                <div className="nav-store">
                    <div className="title-change">
                        <div className="title">
                            <h1>Stores</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div>
                    {status !== "ok" && !stores.length ?
                        <div className="container-loading">
                            <div className="loading-block">
                                <RotatingLines
                                    visible={true}
                                    height="96"
                                    width="96"
                                    color="#00d143"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    ariaLabel="rotating-lines-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>
                        </div>
                        :
                        <>
                            {status === "pending" ?
                                <div className="container-loading">
                                    <div className="loading-block">
                                        <RotatingLines
                                            visible={true}
                                            height="96"
                                            width="96"
                                            color="#00d143"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            ariaLabel="rotating-lines-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    </div>
                                </div>
                                : null}
                            <div className="store-container">
                                {stores.map((store, index) => (
                                    <div key={store.id}
                                        className={status === "pending" ? "disabled-store" : indexS === index || indexD === index ? "active-store" : "store"}>
                                        {status === "pending" ? <div className="opacity-store"></div> :
                                            <Link to={`/stores/${store.name}/${store.id}`}
                                                  className="store-link"></Link>}
                                        <div
                                            className={indexS === index || indexD === index ? "tool-container-active" : "tool-container"}>
                                            <div className={indexS === index ? "tool active-pencil" : "tool pencil"}
                                                 onClick={() => update(index)}>
                                                <FontAwesomeIcon icon={faSquarePen} className="pencil-icon"/>
                                            </div>
                                            <div className={index === indexD ? "tool active-delete" : "tool delete"}
                                                 onClick={() => deleteStore(store.id, store.name, index)}>
                                                <FontAwesomeIcon icon={faTrash} className="delete-icon"/>
                                            </div>
                                        </div>
                                        <div className="store-img">
                                            <img src={store.storeLogo[0].path} alt=""/>
                                        </div>
                                        <div className="store-name">
                                            <h2>{store.name.charAt(0).toUpperCase() + store.name.slice(1)}</h2>
                                        </div>
                                    </div>
                                ))}
                                <div className={status === "pending" ? "disabled-store" : "store"} onClick={() =>
                                    status === "pending" ? null : setIsOpen(true)
                                }>
                                    <FontAwesomeIcon icon={faPlus} className="plus-icon"/>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>

            <ModalCreateStore
                stores={stores[indexS]}
                open={isOpen} onClose={() => {
                setIsOpen(false);
                setIndexS("")
            }}
            />
            <ModalDeleteStore
                id={id}
                store={store}
                open={isOpenDelete} onClose={() => {
                setIsOpenDelete(false);
                setIndexD("")
                setId("")
                setStore("")
            }}
            />
        </div>
    );
};

export default Stores;
