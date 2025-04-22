import React, {useEffect} from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import Login from "./Login";
import {getUser} from "../store/actions/login";


const token = localStorage.getItem("token");

function Layout() {
    const dispatch = useDispatch();
    const location = useLocation();


    useEffect(() => {
        console.log(window.location)

    }, [window]);

    return (
        <>
            <div className="wrapper">
                {token ? <Header/> : <div className="logo-block">
                    <Link to="/" className="logo"><h1>Logo</h1></Link>
                </div>}

                <main className="main">
                    <Outlet/>
                </main>


            </div>

            {/*<ModalLogin*/}
            {/*    open={isOpenLogin} onClose={() => {*/}
            {/*    dispatch(setIsOpenLogin(false))*/}
            {/*}}/>*/}
        </>

    );
}

export default Layout;
