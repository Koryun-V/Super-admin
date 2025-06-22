import React, {useCallback, useEffect, useState} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as Close} from "../../assets/icon/close-x.svg"
import Button from "../mini/Button";
import {setStatus} from "../../store/actions/admin";
import {deleteCategory, getCategories, setStatusDelete} from "../../store/actions/categories";


function ModalDeleteCategory({open, onClose, id, category}) {
    const dispatch = useDispatch();
    const statusDelete = useSelector(state => state.categories.statusDelete);
    const status = useSelector(state => state.categories.status)
    const [isDelete, setIsDelete] = useState(false);

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
        const time = setTimeout(() => {
            if (status === "ok" && statusDelete === "ok") {
                onClose()
            }
        }, 3000)
        return () => clearTimeout(time)

    }, [status, statusDelete]);

    useEffect(() => {
        if (statusDelete === "ok") {
            dispatch(getCategories())
        }
    }, [statusDelete]);

    useEffect(() => {
        if (isDelete) {
            dispatch(deleteCategory(id))
        }
    }, [isDelete]);

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
            dispatch(setStatusDelete(""))
            dispatch(setStatus(""))
            setIsDelete(false);
        }
    }, [open]);

    const deleteStoreFunc = () => {
        setIsDelete(true)
    }


    if (!open) return null
    return ReactDom.createPortal(
        <div id="modal">
            <div className="shadow">
            </div>
            <div id="modal_window">
                <div className="close">
                    <div className="title">
                        <span>Delete category</span>
                    </div>
                    <div className="close-block" onClick={onClose}>
                        <Close className="icon"/>
                    </div>
                </div>
                <div className="modal-block" style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div className="container-modal">
                        <>
                            {statusDelete !== "" && status !== "" ? <div className="delete-loading"></div> : null}
                            {statusDelete === "ok" && status === "ok" ? <span className="delete-loading-span">Deleted</span>
                                :
                                status === "pending" || statusDelete === "pending" ?
                                    <span
                                        className="delete-loading-span">Category is being deleted...</span>
                                    : null}
                            <div className="delete-block" style={{
                                opacity: statusDelete !== "" ? 0 : 1,
                            }}>
                                <span>Are you sure you want to delete the category <span
                                    className="store-name">{category} </span>?</span>
                            </div>
                            <div className="buttons">
                                <div className="no-delete-button">
                                    <Button
                                        onClick={deleteStoreFunc}
                                        status={isDelete && status === "pending" || statusDelete === "pending" ? "pending" : ""}
                                        type="button"
                                        className="active-button"
                                    >YES</Button>
                                </div>
                                <div className="delete-button">
                                    <Button
                                        disabled={statusDelete === "pending"}
                                        onClick={onClose}
                                        type="button"
                                        className="active-button"
                                    >NO</Button>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

ModalDeleteCategory.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    backdropBG: PropTypes.string,
    zIndex: PropTypes.number,
    overflowY: PropTypes.bool,
};

export default ModalDeleteCategory;
