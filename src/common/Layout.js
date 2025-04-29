import React from "react";
import {Link, Outlet} from "react-router-dom";
import Header from "./Header";
import {useQuery} from "../utills/hooks/useQuery";


const token = localStorage.getItem("token");

function Layout() {
    const {query, setQuery} = useQuery();
    const {q} = query


    return (
        <>
            <div className="wrapper">
                {token ? <Header/> : <div className="logo-block">
                    <Link to="/" className="logo"><h1>Logo</h1></Link>
                </div>}

                <main className="main" style={{
                    marginLeft:q === "change-password" ?  "0" : "350px",
                }}>
                    <Outlet/>
                </main>
            </div>
        </>

    );
}

export default Layout;
