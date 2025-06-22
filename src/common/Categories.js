import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {RotatingLines} from "react-loader-spinner";
import {getCategories} from "../store/actions/categories";
import ModalCreateCategory from "./Modal/ModalCreateCategory";
import ModalDeleteCategory from "./Modal/ModalDeleteCategory";

const Categories = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.categories.status)
    const categories = useSelector(state => state.categories.categories)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [indexS, setIndexS] = useState("")
    const [indexD, setIndexD] = useState("")
    const [category, setCategory] = useState("")
    const [id, setId] = useState("")

    console.log(categories,"s")
    useEffect(() => {
        dispatch(getCategories())
    }, []);


    const deleteCategory = (id, name, index) => {
        setIsOpenDelete(true)
        setId(id)
        setIndexD(index)
        setCategory(name)
    }



    return (
        <div className="section">
            <div className="store-header">
                <div className="nav-store">
                    <div className="title">
                        <h1>Categories</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div>
                    {status !== "ok" && !categories.length ?
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
                                {categories.map((category, index) => (
                                    <div key={category.id}
                                         className={status === "pending" ? "disabled-store" : indexS === index || indexD === index ? "active-store" : "store"}>
                                        {status === "pending" ? <div className="opacity-store"></div> :
                                            <Link to={`/stores/${category.name}/${category.id}`}
                                                  className="store-link"></Link>}
                                        <div
                                            className={indexS === index || indexD === index ? "tool-container-active" : "tool-container"}>
                                            <div className={index === indexD ? "tool active-delete" : "tool delete"}
                                                 onClick={() => deleteCategory(category.id, category.name, index)}>
                                                <FontAwesomeIcon icon={faTrash} className="delete-icon"/>
                                            </div>
                                        </div>
                                        <div className="store-img">
                                            <img src={category.categoryImage[0].path} alt=""/>
                                        </div>
                                        <div className="store-name">
                                            <h2>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</h2>
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

            <ModalCreateCategory
                category={categories[indexS]}
                open={isOpen} onClose={() => {
                setIsOpen(false);
                setIndexS("")
            }}
            />
            <ModalDeleteCategory
                id={id}
                category={category}
                open={isOpenDelete} onClose={() => {
                setIsOpenDelete(false);
                setIndexD("")
                setId("")
                setCategory("")
            }}
            />
        </div>
    );
};

export default Categories;
