import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getStatisticsAll} from "../store/actions/statistics";
import StatisticsAll from "./mini/StatisticsAll";
import PieStatistics from "./mini/PieStatistics";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faCube, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import DateP from "./DateP";
import {useQuery} from "../utills/hooks/useQuery";
import {RotatingLines} from "react-loader-spinner";

const Home = () => {
    const dispatch = useDispatch();
    const statistics = useSelector(state => state.statistics.statisticsAll);
    const status = useSelector(state => state.statistics.status);
    const {query, setQuery} = useQuery();
    const {q, startDate, endDate} = query;
    const defaultStart = new Date();
    const defaultEnd = new Date();
    defaultStart.setMonth(defaultStart.getMonth() - 1);


    useEffect(() => {
        if (startDate && endDate) {
            dispatch(getStatisticsAll({startDate, endDate}));
        } else {
            dispatch(getStatisticsAll({}))
        }
    }, [startDate, endDate]);

    return (
        <div className="section">
            <div className="store-header">
                <div className="nav-store">
                    <div className="title">
                        <h1>Dashboard</h1>
                    </div>
                     <DateP defaultStart={defaultStart} defaultEnd={defaultEnd}/>
                </div>
            </div>

            {status !== "ok" && !statistics.statistics ?
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
                statistics && statistics.statistics ?
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
                            <div className={status === "pending" ? "disabled-dashboard" : "dashboard"}>
                                {status === "pending" ? <div className="opacity-store"></div> :
                                    null}

                                <div className="totals">
                                    <div className="container-total">
                                        <div className="block-total">
                                            <div className="title-total">
                                                <h2>Total product count</h2>
                                                <FontAwesomeIcon icon={faCube} className="total-icon-all"/>
                                            </div>

                                            <div className="total-table">
                                                <div className="total-all-time">
                                                    <strong>All time</strong>
                                                    <span>{statistics.productCountAllTime}</span>
                                                </div>
                                                <div className="hr"></div>
                                                <div className="total-all-time">
                                                    <strong>With date</strong>
                                                    <span>{statistics.totalProductPeriod}</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="block-total">
                                            <div className="title-total">

                                                <h2>Total sales</h2>
                                                <FontAwesomeIcon icon={faCartShopping} className="total-icon-all"/>
                                            </div>
                                            <div className="total-table">
                                                <div className="total-all-time">
                                                    <strong>All time</strong>
                                                    <span>{statistics.totalProductsSoldAllTime}</span>
                                                </div>
                                                <div className="hr"></div>
                                                <div className="total-all-time">
                                                    <strong>With date</strong>
                                                    <span>{statistics.totalProductsSoldPeriod}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block-total">
                                            <div className="title-total">

                                                <h2>Total revenue</h2>
                                                <FontAwesomeIcon icon={faDollarSign} className="total-icon-all"/>
                                            </div>
                                            <div className="total-table">
                                                <div className="total-all-time">
                                                    <strong>All time</strong>
                                                    <span>{statistics.totalRevenueAllTime}</span>
                                                </div>
                                                <div className="hr"></div>
                                                <div className="total-all-time">
                                                    <strong>With date</strong>
                                                    <span>{statistics.totalRevenuePeriod}</span>
                                                </div>
                                            </div>
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
                        </div>
                    </> : <div className="container-loading">
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
                    </div>}
        </div>
    );
};

export default Home;
