import React from "react";
import {Link, Outlet} from "react-router-dom";
import Header from "./Header";
import {useQuery} from "../utills/hooks/useQuery";
import logo from "../assets/icon/logo.png";


const token = localStorage.getItem("token");

function Layout() {
    const {query, setQuery} = useQuery();
    const {q} = query


    return (
        <>
            <div className="wrapper">
                {token ? <Header/> : <div className="logo-block">
                    <div className="logo">
                        <Link to="/" className="logo-img">
                            <img src={logo}/>
                        </Link>
                        {/*<h1>Multify</h1>*/}
                    </div>
                </div>}

                <main className="main" style={{
                    marginLeft: q === "change-password" ? "0" : "350px",
                }}>
                    <Outlet/>
                </main>
            </div>
        </>

    );
}

export default Layout;
