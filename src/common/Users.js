import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers, setIsCancel, setTotal, setUsers} from "../store/actions/users";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCakeCandles,
    faMars,
    faPencil,
    faPlus,
    faSignal,
    faUser,
    faUserTie,
    faVenus
} from "@fortawesome/free-solid-svg-icons";
import usePagePlus from "./mini/usePagePlus";
import {RotatingLines} from "react-loader-spinner";
import _ from "lodash";


const fields = [
    {
        id: 1,
        name: "user",
    },
    {
        id: 2,
        name: "admin",
    }
]

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const isCancel = useSelector((state) => state.users.isCancelNetwork);
    const total = useSelector((state) => state.users.total);
    const [isLoading, setIsLoading] = useState(false)
    const status = useSelector(state => state.users.status);
    const {page, setPage, setIsScrollLocked} = usePagePlus()
    const [mentioned, setMentioned] = useState(["user", "admin"])


    useEffect(() => {
        if (mentioned.length === 0) {
            dispatch(setUsers([]))
            dispatch(setIsCancel(true))
        } else {
            dispatch(setUsers([]))
            dispatch(setIsCancel(false))
            dispatch(setTotal(0))
            setPage(1)
            getUser(1)
        }
    }, [mentioned]);


    useEffect(() => {
        if (!isLoading && page !== 1 && total > users.length) {
            getUser(page)
        }
    }, [page]);


    const getUser = (page) => {
        (async () => {
            try {
                setIsLoading(true);
                if (mentioned.length === 1) {
                    await dispatch(getUsers({limit: 10, page, role: mentioned[0]}))
                } else {
                    await dispatch(getUsers({limit: 10, page}));
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
                setIsScrollLocked(false); // <---- здесь разблокируем скролл
            }
        })();
    };


    const formatDate = (date) => {
        const format = new Date(date)
        const day = format.getDate()
        const month = format.getMonth()
        const year = format.getFullYear()
        const hours = format.getHours()
        const minutes = format.getMinutes()
        const hoursIf = hours !== 4 ? `${hours}:${minutes < 10 ? `0${minutes}` : minutes}` : ""
        return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}   ${hoursIf}`
    }
    const func = (name) => {
        if (mentioned.includes(name)) {
            const filter = mentioned.filter(item => item !== name);
            setMentioned(filter)
        } else {
            setMentioned(_.uniq([...mentioned, name]));
        }
    }

    return (
        <div className="section">
            <div className="store-header">
                <div className="nav-store">
                    <div className="title">
                        <h1 style={{
                            marginRight:10,
                        }}>Users /</h1>
                        {status === "pending" && !users.length ? <div className="loading-gradient-t"></div> : <h1>{users.length ? total : 0}</h1>}
                    </div>
                    <div className="change-users">
                        {fields.map(({id, name}) => (
                            <div className="change-container" key={id}>
                                <div className={mentioned.includes(name) ? "change-block" : "change-block-disabled"}
                                     onClick={() => func(name)}>
                                    <div className="change"></div>
                                </div>
                                <h3>{name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container">
                {status === "pending" ? <div className="opacity-store"></div> : null}
                {!isCancel && status !== "ok" && !users.length ?
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
                        {!isCancel && status === "pending" ?
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
                            : null}

                        <div className="users" style={{
                            opacity: status !== "ok" ? 0.5 : 1,
                        }}>
                            {users.map((user) => (
                                <div className="user" key={user.id}>
                                    {user.avatar[0] ?
                                        <div className="user-img">
                                            <img src={user.avatar[0].path}/>
                                        </div>
                                        :
                                        <div className="user-img-custom">
                                            <FontAwesomeIcon icon={faUser} className="icon"/>
                                        </div>
                                    }
                                    <div className="user-info">
                                        <div className="user-titles">


                                    <span
                                        className="user-title">{user.email.charAt(0).toUpperCase() + user.email.slice(1)}</span>
                                            <span
                                                className="user-title">{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</span>
                                        </div>
                                        <div className="user-infos">

                                    <span className="user-p">
                                        {user.gender === "male" ? <FontAwesomeIcon icon={faMars} style={{
                                                color: "blue"
                                            }}/>
                                            : <FontAwesomeIcon icon={faVenus} style={{
                                                color: "#ff00cd",
                                            }}/>
                                        }


                                        {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</span>
                                            <span className="user-p number"><FontAwesomeIcon
                                                icon={faCakeCandles}/>{formatDate(user.dateOfBirth)}</span>
                                            <span className="user-p number"><FontAwesomeIcon icon={faPlus}
                                            />{formatDate(user.createdAt)}</span>
                                            <span className="user-p number"><FontAwesomeIcon icon={faPencil}
                                            />{formatDate(user.updatedAt)}</span>
                                            <span className="user-p"><FontAwesomeIcon icon={faUserTie} style={{
                                                color: user.role === "admin" ? "#c100ff" : ""
                                            }}/>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                                            <span className="user-p"><FontAwesomeIcon icon={faSignal} style={{
                                                color: user.status === "active" ? "#00d143" : "red",
                                            }}/>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>

                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </>}


            </div>
        </div>
    );
};

export default Users;
