import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Statistics from "./mini/Statistics";
import DateP from "./DateP";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faCube,
    faDollarSign,
    faPlus,
    faRubleSign,
    faTrash,
    faTruck,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {getAdmin} from "../store/actions/admin";
import ModalDeleteAdmin from "./Modal/ModalDeleteAdmin";
import {useQuery} from "../utills/hooks/useQuery";
import {useParams} from "react-router-dom";
import moment from "moment";
import ModalCreateAdmin from "./Modal/ModalCreateAdmin";
import {RotatingLines} from "react-loader-spinner";
import {getBuyers, getStatistics} from "../store/actions/statistics";

const Store = () => {
    const dispatch = useDispatch();
    const {id, name} = useParams()
    const statistics = useSelector(state => state.statistics.statistics);
    const statisticsTotal = useSelector(state => state.statistics.statisticsTotal);
    const buyers = useSelector(state => state.statistics.buyers);
    const admins = useSelector(state => state.admin.admins);
    const status = useSelector(state => state.statistics.status)
    const statusBuyers = useSelector(state => state.statistics.statusBuyers)
    const statusAdmin = useSelector(state => state.admin.status)

    const {query, setQuery} = useQuery();
    const {q, startDate, endDate} = query
    const [isOpen, setIsOpen] = useState(false);
    const defaultStart = new Date('2025-04-01');
    const defaultEnd = new Date('2025-04-30');

    const [isOpenDelete, setIsOpenDelete] = useState(false);

    useEffect(() => {
        dispatch(getAdmin({id}))
    }, []);

    const [adminInfo, setAdminInfo] = useState({
        adminId: "",
        indexA: "",
        adminEmail: ""
    });

    const {adminId, indexA, adminEmail} = adminInfo

    const deleteAdmin = (id, index, adminEmail) => {
        setIsOpenDelete(true)
        setAdminInfo({
            adminId: id,
            indexA: index,
            adminEmail: adminEmail
        })
    }

    const getAdmins = () => {
        setQuery({q: "admins"});
        dispatch(getAdmin({id}))
    }

    useEffect(() => {
        const start = moment(defaultStart).format('YYYY-MM-DD');
        const end = moment(defaultEnd).format('YYYY-MM-DD');
        if (startDate && endDate) {
            dispatch(getStatistics({id, startDate, endDate}));
            dispatch(getBuyers({id, startDate, endDate}));
        } else {
            dispatch(getStatistics({id}));
            dispatch(getBuyers({id}));
        }
    }, [startDate, endDate]);


    return (
        <div className="section">
            <div className="store-header">
                <div className="nav-store">
                    <div className="title-change">
                        <div className={q === "admins" ? "title-disabled" : "title-active"}
                             onClick={() =>
                                 q === "admins" ? setQuery({q: "statistics", startDate, endDate}) : null
                             }>
                            <h1>Statistics</h1>
                        </div>
                        <div className={q !== "admins" ? "title-disabled" : "title-active"} onClick={getAdmins}>
                            <h1>Admins</h1>
                        </div>
                        <div className="change-line" style={{
                            transform: q === "admins" ? "translateX(50%)" : "translateX(-50%)",
                        }}>
                        </div>
                    </div>
                    {q !== "admins" ? <DateP id={id} defaultStart={defaultStart} defaultEnd={defaultEnd}
                        />
                        : null}
                </div>
            </div>
            <div className="container">
                {q !== "admins" ?
                    <div>
                        {status !== "ok" && statusBuyers !== "ok" && !statistics.length && !buyers.length ?
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
                                {status === "pending" || statusBuyers === "pending" ?
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
                                    </div> : null}
                                <div
                                    className={status === "pending" || statusBuyers === "pending" ? "container-statistics-disabled" : "container-statistics"}>
                                    {status === "pending" || statusBuyers === "pending" ?
                                        <div className="opacity-store"></div> : null}

                                    {/*<div className="total-container">*/}
                                    {/*    <div className="total">*/}
                                    {/*        <h4>Total Revenue*/}
                                    {/*            - {Math.round(statisticsTotal.totalRevenue)}<FontAwesomeIcon*/}
                                    {/*                icon={faRubleSign} className="total-icon"/></h4>*/}
                                    {/*        <h4>Product count - {statisticsTotal.productCount}<FontAwesomeIcon*/}
                                    {/*            icon={faCube}*/}
                                    {/*            className="total-icon"/>*/}
                                    {/*        </h4>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}


                                    <div className="totals">
                                        <div className="container-total">
                                            <div className="block-total">
                                                <h2>Total count</h2>
                                                <span>{statisticsTotal.productCount}<FontAwesomeIcon
                                                    icon={faCube} className="total-icon"/></span>
                                            </div>
                                            <div className="block-total">
                                                <h2>Total orders</h2>
                                                <span>{statisticsTotal.totalOrders}<FontAwesomeIcon
                                                    icon={faTruck} className="total-icon"/></span>
                                            </div>
                                            <div className="block-total">
                                                <h2>Total revenue</h2>
                                                <span>{statisticsTotal.totalRevenue}
                                                    <FontAwesomeIcon icon={faDollarSign} className="total-icon"/></span>
                                            </div>
                                            <div className="block-total">
                                                <h2>Total sales</h2>
                                                <span>{statisticsTotal.totalSales}<FontAwesomeIcon
                                                    icon={faCartShopping} className="total-icon"/></span>
                                            </div>
                                        </div>
                                    </div>
                                    <Statistics data={statistics} name={statisticsTotal.storeId}/>
                                    <div className="buyers">
                                        <div className="buyers-header">
                                            <div className="title">
                                                <h1>Buyers</h1>
                                            </div>
                                        </div>
                                        <div className="buyers-block">
                                            {buyers.map((buyer, index) => (
                                                <div className="buyer" key={buyer.id}>
                                                    <div className="img-block">
                                                        {buyer.avatar ?
                                                            <div className="buyer-img">
                                                                <img src={buyer.avatar} alt=""/>
                                                            </div>
                                                            :
                                                            <div className="user-img-container-custom">
                                                                <FontAwesomeIcon icon={faUser} className="icon"/>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="buyer-titles">
                                                        <div className="buyer-title">
                                                    <span
                                                        className="buyer-text">{buyer.email.charAt(0).toUpperCase() + buyer.email.slice(1)}</span>
                                                        </div>
                                                        <div className="buyer-title">
                                                    <span
                                                        className="buyer-text">Total spent - {Math.round(buyer.totalSpent)}</span>
                                                            <FontAwesomeIcon icon={faRubleSign} className="total-icon"/>

                                                        </div>
                                                        <div className="buyer-title">
                                                    <span
                                                        className="buyer-text">Total quantity - {buyer.totalQuantity}</span>
                                                            <FontAwesomeIcon icon={faCube} className="total-icon"/>
                                                        </div>
                                                    </div>
                                                    {/*<div className="buyer-icon">*/}
                                                    {/*    <FontAwesomeIcon icon={faEnvelope} className="total-icon"/>*/}
                                                    {/*    <FontAwesomeIcon icon={faRubleSign} className="total-icon"/>*/}
                                                    {/*    <FontAwesomeIcon icon={faCube} className="total-icon"/>*/}
                                                    {/*</div>*/}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    :
                    <>
                        {statusAdmin !== "ok" && !admins.length
                            ?
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
                            <div>
                                {statusAdmin === "pending" ?
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
                                    </div> : null}
                                <div className="admins">
                                    {admins.map((admin, index) => (
                                        <div key={admin.id} style={{cursor: "default"}}
                                             className={statusAdmin === "pending" ? "disabled-store" : indexA === index ? "active-admin" : "admin"}>
                                            {statusAdmin === "pending" ? <div className="opacity-store"></div>
                                                : null}
                                            <div
                                                className={indexA === index ? "tool-container-active" : "tool-container"}>
                                                <div className={index === indexA ? "tool active-delete" : "tool delete"}
                                                     onClick={() => deleteAdmin(admin.id, index, admin.email)} style={{
                                                    cursor: "pointer"
                                                }}>
                                                    <FontAwesomeIcon icon={faTrash} className="delete-icon"/>
                                                </div>
                                            </div>
                                            {admin.avatar[0] ?
                                                <div className="admin-img">
                                                    <img src={admin.avatar[0].path}/>
                                                </div>
                                                :
                                                <div className="admin-img-custom">
                                                    <FontAwesomeIcon icon={faUser} className="icon"/>
                                                </div>
                                            }
                                            <div className="admin-email">
                                                <h2>{admin.email.charAt(0).toUpperCase() + admin.email.slice(1)}</h2>
                                            </div>
                                        </div>
                                    ))}
                                    <div className={statusAdmin === "pending" ? "disabled-store" : "store"}
                                         onClick={() =>
                                             statusAdmin === "pending" ? null : setIsOpen(true)
                                         }>
                                        <FontAwesomeIcon icon={faPlus} className="plus-icon"/>
                                    </div>
                                </div>

                                <ModalCreateAdmin
                                    id={id}
                                    open={isOpen} onClose={() => {
                                    setIsOpen(false);
                                }}
                                />
                                <ModalDeleteAdmin
                                    id={id}
                                    adminEmail={adminEmail}
                                    adminId={adminId}
                                    open={isOpenDelete} onClose={() => {
                                    setIsOpenDelete(false);
                                    setAdminInfo({
                                        adminId: "",
                                        indexA: "",
                                        adminEmail: ""
                                    })
                                }}
                                />
                            </div>}
                    </>
                }
            </div>
        </div>

    );
};

export default Store;
