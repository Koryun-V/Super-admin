import axios from "axios";


const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),

    },

    baseURL: "https://world-of-construction.onrender.com"
})
const token = localStorage.getItem("token");


export default class Api {
    static loginUser({email, password}) {
        return api.post(`/users/login`, {email, password});
    }

    static getUser() {
        return api.get(`/users/profile`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    static getStores() {
        return api.get(`/superAdmin/stores`, {
            headers: {
                Authorization: `${token}`
            }
        })
    }

    static getStatistics({id, startDate, endDate}) {
        return api.get(`/superAdmin/statistics/${id}`, {
            params: {
                startDate,
                endDate,
            },
            headers: {
                Authorization: `${token}`
            }
        })
    }

    static getBuyers({id, startDate, endDate}) {
        return api.get(`/superAdmin/stores/${id}/buyers`, {
            params: {
                startDate,
                endDate,
            },
            headers: {
                Authorization: `${token}`
            }
        })
    }

    static createStore({name, city, country, latitude, longitude, logo}) {
        console.log(logo, "test")
        return api.post("superAdmin/stores/create",
            {
                name,
                logo,
                location: {
                    city,
                    country,
                    latitude,
                    longitude,
                }
            },
            {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data",
                }
            })
    }

    static updateStore({id, name, city, country, latitude, longitude, logo}) {
        return api.put(`superAdmin/stores/${id}`,
            {
                name,
                logo,
                location: {
                    city,
                    country,
                    latitude,
                    longitude,
                }
            },
            {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data",
                }
            })
    }

    static deleteStores(id) {
        console.log(id, "errrrrrrrrrr")
        return api.delete(`superAdmin/stores/${id}`,
            {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                }
            })
    }

    static getAdmin({id}) {
        return api.get(`/superAdmin/stores/admins/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }
    static createAdmin({email, storeId}) {
        return api.post(`/superAdmin/stores/assign-user`, {
                email,
                storeId,
            },
            {
                headers: {
                    Authorization: `${token}`
                }
            }
        );
    }
    static removeAdmin({adminId, storeId}) {
        return api.put(`/superAdmin/remove-admin`, {
                adminId,
                storeId,
            },
            {
                headers: {
                    Authorization: `${token}`
                }
            }
        );
    }

}

