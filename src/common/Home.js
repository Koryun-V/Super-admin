import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getBuyers, getStatistics, getStatisticsAll} from "../store/actions/statistics";
import StatisticsAll from "./mini/StatisticsAll";
import PieStatistics from "./mini/PieStatistics";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faCube, faRubleSign, faTruck} from "@fortawesome/free-solid-svg-icons";
import StatisticsMini from "./mini/StatisticsMini";
import DateP from "./DateP";
import {getStores} from "../store/actions/store";
import moment from "moment/moment";
import {useQuery} from "../utills/hooks/useQuery";
import {RotatingLines} from "react-loader-spinner";

const Home = () => {
    const dispatch = useDispatch();
    const statistics = useSelector(state => state.statistics.statisticsAll);
    const status = useSelector(state => state.statistics.status);
    const {query, setQuery} = useQuery();
    const {q, startDate, endDate} = query;
    const defaultStart = new Date('2025-04-01');
    const defaultEnd = new Date('2025-04-30');


    useEffect(() => {
        if (startDate && endDate) {
            dispatch(getStatisticsAll({startDate, endDate}));
        } else {
            dispatch(getStatisticsAll({}))
        }
    }, [startDate, endDate]);

    console.log(statistics, "w")
    return (
        <div className="section">
            <div className="store-header">
                <div className="nav-store">
                    <div className="title-change">
                        <div className="title">
                            <h1>Dashboard</h1>
                        </div>
                    </div>
                    <DateP defaultStart={defaultStart} defaultEnd={defaultEnd}/>
                </div>
            </div>


            {status !== "ok" && !statistics.length ?
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
                        </div> : null}
                    <div className="container">
                        <div className="totals">
                            <div className="container-total">
                                <div className="block-total">
                                    <h2>Total count</h2>
                                    <span>{statistics.reduce((sum, store) => sum + store.productCount, 0)}<FontAwesomeIcon
                                        icon={faCube} className="total-icon"/></span>
                                </div>
                                <div className="block-total">
                                    <h2>Total orders</h2>
                                    <span>{statistics.reduce((sum, store) => sum + store.totalOrders, 0)}<FontAwesomeIcon
                                        icon={faTruck} className="total-icon"/></span>
                                </div>
                                <div className="block-total">
                                    <h2>Total revenue</h2>
                                    <span>{statistics.reduce((sum, store) => sum + store.totalRevenue, 0)}<FontAwesomeIcon
                                        icon={faRubleSign} className="total-icon"/></span>
                                </div>
                                <div className="block-total">
                                    <h2>Total sales</h2>
                                    <span>{statistics.reduce((sum, store) => sum + store.totalSales, 0)}<FontAwesomeIcon
                                        icon={faCartShopping} className="total-icon"/></span>
                                </div>
                            </div>
                        </div>


                        <div className="diagram-container">
                            <div className="line-block">
                                <div className="title-sales">
                                    <h2>Revenue history</h2>
                                </div>
                                <StatisticsAll data={statistics}/>
                            </div>

                            <div className="pie-block">
                                <div className="title-sales">
                                    <h2>Sales history</h2>
                                </div>
                                <PieStatistics data={statistics}/>
                            </div>

                        </div>

                    </div>
                </>}
        </div>
    );
};

export default Home;
