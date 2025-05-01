import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faCode, faGaugeHigh, faLayerGroup, faUser} from "@fortawesome/free-solid-svg-icons";
import {getUser, setSuperAdmin} from "../store/actions/login";
import {useQuery} from "../utills/hooks/useQuery";
import ModalLogOut from "./Modal/ModalLogOut";

const token = localStorage.getItem("token");

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const status = useSelector(state => state.login.statusUser);
    const location = useLocation();
    const {name, id} = useParams();
    const {query, setQuery} = useQuery();
    const {q} = query
    const [isOpen,setIsOpen] = useState( false)


    useEffect(() => {
        if (token) {
            dispatch(getUser())
        }
    }, [token]);



    return (
        <header className="header"
                style={{
                    opacity: q === "change-password" ? 0 : 1,
                    zIndex: q === "change-password" ? -1 : 999,
                }}
        >
            <div className="nav-header">
                <div className="container-header">
                    <div className="logo-block">
                        <Link to="/" className="logo"><h1>Logo</h1></Link>
                    </div>

                    <div className="super-container">
                        <h1 style={{
                            opacity: location.pathname === "/profile" ? 1 : 0,
                            zIndex: location.pathname === "/profile" ? 10 : -1,
                        }}>Super admin</h1>
                        <div className="super-admin-container"
                             style={{
                                 background: location.pathname === "/profile" ? "#0a0a0d" : "",
                             }}>

                            <Link to="/profile"
                                  className={location.pathname === "/profile" ? "super-admin-active" : "super-admin"}>
                                <div className="anim-admin" style={{
                                    transform: location.pathname === "/profile" ? "translateX(100%)" : "translateX(0%)",
                                    opacity: location.pathname === "/profile" ? 0 : 1,
                                }}>
                                    {status === "ok" ?
                                        <>

                                            <div className="user-img">
                                                {user.avatar.length ?
                                                    <div className="user-img-container">
                                                        <img src={user.avatar[0].path}/>
                                                    </div>
                                                    :
                                                    <div className="user-img-container-custom">
                                                        <FontAwesomeIcon icon={faUser} className="icon"/>
                                                    </div>
                                                }
                                                <div className="indicator"></div>
                                            </div>
                                            <div className="user-name">
                                                <span>{user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)} {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}</span>
                                                <span>{user.email}</span>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="user-img">
                                                <div className="user-img-container-custom-loading loading-gradient">
                                                </div>
                                            </div>
                                            <div className="user-name">
                                                <span className="loading-gradient" style={{height: 20}}></span>
                                                <span className="loading-gradient" style={{height: 20}}></span>
                                            </div>
                                        </>
                                    }
                                </div>
                            </Link>


                        </div>
                    </div>

                    <div className="nav-text">
                        <h3>Navigation</h3>
                    </div>

                    <nav className="nav">
                        <ul className="nav-list">
                            <Link to="/" className={location.pathname === "/" ? "active-item" : "nav-item"}>
                                <li>
                                    <div
                                        className={location.pathname === "/" ? "active-nav" : "disabled-nav"}></div>

                                    <FontAwesomeIcon icon={faGaugeHigh} className="nav-icon"/>
                                    <span>Dashboard</span>
                                </li>
                            </Link>
                            <Link to="/stores"
                                  className={location.pathname === "/stores" || location.pathname === `/stores/${name}/${id}` || location.pathname === `/stores/${name}/admins` ? "active-item" : "nav-item"}>
                                <li>
                                    <div
                                        className={location.pathname === "/stores" || location.pathname === `/stores/${name}/${id}` || location.pathname === `/stores/${name}/admins` ? "active-nav" : "disabled-nav"}></div>
                                    <FontAwesomeIcon icon={faLayerGroup} className="nav-icon"/>
                                    <span>Stores {name ? `/ ${name.charAt(0).toUpperCase() + name.slice(1)}` : null}</span>
                                </li>
                            </Link>
                            <Link to="/projects"
                                  className={location.pathname === "/projects" ? "active-item" : "nav-item"}>
                                <li>
                                    <div
                                        className={location.pathname === "/projects" ? "active-nav" : "disabled-nav"}></div>
                                    <FontAwesomeIcon icon={faCode} className="nav-icon"/>
                                    <span>Projects </span>
                                </li>
                            </Link>


                            <li style={{
                                border:"none"
                            }}className={isOpen ? "active-item" : "nav-item"} onClick={() => {
                                setIsOpen(true)
                                setQuery({q:"log-out"})
                            }
                            }>
                                <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                                <span>Log Out</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <ModalLogOut
                open={isOpen} onClose={() => {
                setIsOpen(false)
                setQuery({q:""})
            }}
            />
        </header>
    );
};

export default Header;
