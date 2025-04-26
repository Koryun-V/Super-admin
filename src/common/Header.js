import React, {useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faGaugeHigh, faLayerGroup, faUser} from "@fortawesome/free-solid-svg-icons";
import {getUser, setSuperAdmin} from "../store/actions/login";

const token = localStorage.getItem("token");

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const status = useSelector(state => state.login.statusUser);
    const location = useLocation();
    const {name, id} = useParams();


    useEffect(() => {
        if (token) {
            dispatch(getUser())
        }
    }, [token]);

    useEffect(() => {
        console.log("Current path:", location);
    }, [location]);

    return (
        <header className="header">
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

                            {status === "ok" ?
                                <Link to="/profile"
                                      className={location.pathname === "/profile" ? "super-admin-active" : "super-admin"}
                                >
                                    <div className="anim-admin" style={{
                                        transform: location.pathname === "/profile" ? "translateX(100%)" : "translateX(0%)",
                                        opacity: location.pathname === "/profile" ? 0 : 1,


                                    }}>
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
                                    </div>
                                </Link>
                                :
                                location.pathname !== "/profile" ?
                                    <div className="super-admin-pending">
                                        <div className="user-img">
                                            <div className="user-img-container-custom-loading loading-gradient">
                                            </div>
                                        </div>
                                        <div className="user-name">
                                            <span className="loading-gradient" style={{height: 20}}></span>
                                            <span className="loading-gradient" style={{height: 20}}></span>
                                        </div>
                                    </div>
                                    : null
                            }
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

                            <li className="nav-item" onClick={() => {
                                localStorage.removeItem("token")
                                window.location.reload(true)
                                dispatch(setSuperAdmin({}))
                            }
                            }>
                                <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                                <span>Log Out</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>


        </header>
    );
};

export default Header;
