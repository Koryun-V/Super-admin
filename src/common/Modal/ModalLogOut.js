import React, {useCallback, useEffect} from 'react';
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {ReactComponent as Close} from "../../assets/icon/close-x.svg"
import Button from "../mini/Button";
import {setSuperAdmin} from "../../store/actions/login";
import {useQuery} from "../../utills/hooks/useQuery";


function ModalLogOut({open, onClose}) {
    const dispatch = useDispatch();
    const {query, setQuery} = useQuery();
    const {q} = query

    useEffect(() => {
        if(!q){
            onClose()
        }
    }, [q]);

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
        }
    }, [open]);


    if (!open) return null
    return ReactDom.createPortal(
        <div id="modal">
            <div className="shadow">
            </div>
            <div id="modal_window">
                <div className="close">
                    <div className="title">
                        <span>Log Out</span>
                    </div>
                    <div className="close-block" onClick={onClose}>
                        <Close className="icon"/>
                    </div>
                </div>
                <div className="modal-block" style={{
                    justifyContent: "space-between",
                }}>
                    <div className="container-modal">
                        <div className="log-out">
                            <span>Are you sure you want to log out ?</span>
                        </div>
                        <div className="buttons-log-out">
                            <div className="no-log-out-button">
                                <Button
                                    onClick={() => {
                                        localStorage.removeItem("token")
                                        window.location.reload(true)
                                        dispatch(setSuperAdmin({}))
                                    }}
                                    type="button"
                                    className="active-button"
                                >YES</Button>
                            </div>
                            <div className="log-out-button">
                                <Button
                                    onClick={onClose}
                                    type="button"
                                    className="active-button"
                                >NO</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

ModalLogOut.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    backdropBG: PropTypes.string,
    zIndex: PropTypes.number,
    overflowY: PropTypes.bool,
};

export default ModalLogOut;
