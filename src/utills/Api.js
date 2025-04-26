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

    static updateAdminInfo({firstName, lastName, gender, avatar}) {
        return api.put(`/users/update`, {
                firstName,
                lastName,
                gender,
                avatar,
                dateOfBirth: "2000-01-01",
                address: "super-admin@example.com",
            },
            {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "multipart/form-data",

                }
            }
        );
    }

    static deleteAdminAvatar() {
        return api.delete(`/users/delete-avatar`, {
            headers: {
                Authorization: `${token}`
            }
        })
    }

    static getStores() {
        return api.get(`/super-admin/stores`, {
            headers: {
                Authorization: `${token}`
            }
        })
    }

    static getStatisticsAll({startDate, endDate}) {
        return api.get(`/super-admin/stores/all-statistics`, {
            params: {
                startDate,
                endDate,
            },
            headers: {
                Authorization: `${token}`
            }
        })
    }

    static getStatistics({id, startDate, endDate}) {
        return api.get(`/super-admin/statistics/${id}`, {
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
        return api.get(`/super-admin/stores/${id}/buyers`, {
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
        return api.post("super-admin/stores/create",
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
        return api.put(`super-admin/stores/${id}`,
            {
                name,
                logo,
                location: {
                    city,
                    country,
                    latitude,
                    longitude
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
        return api.delete(`super-admin/stores/${id}`,
            {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                }
            })
    }

    static getAdmin({id}) {
        return api.get(`/super-admin/stores/admins/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
    }

    static createAdmin({email, storeId}) {
        return api.post(`/super-admin/stores/assign-user`, {
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
        return api.put(`/super-admin/remove-admin`, {
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

