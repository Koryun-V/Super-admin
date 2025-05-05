import axios from "axios";

const api = axios.create({
    baseURL: "https://world-of-construction.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// Интерцептор добавляет актуальный токен к каждому запросу
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default class Api {
    static loginUser({email, password}) {
        return api.post(`/users/login`, {email, password});
    }

    static forgotPasswordUser({email}) {
        return api.post(`/users/forgot/password`, {email});
    }

    static changePasswordUser({newPassword, key}) {
        return api.put(`/users/update/password`, {newPassword, key});
    }

    static resendCode({email}) {
        return api.post(`/users/resend-code`, {email});
    }

    static getUser() {
        return api.get(`/users/profile`);
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
                    "Content-Type": "multipart/form-data",
                }
            }
        );
    }

    static changePassword({newPassword}) {
        return api.put(`/users/password`, {newPassword});
    }

    static deleteAdminAvatar() {
        return api.delete(`/users/delete-avatar`);
    }

    static getStores() {
        return api.get(`/super-admin/stores`);
    }

    static getStatisticsAll({startDate, endDate}) {
        return api.get(`/super-admin/stores/all-statistics`, {
            params: {startDate, endDate}
        });
    }

    static getStatistics({id, startDate, endDate}) {
        return api.get(`/super-admin/statistics/${id}`, {
            params: {startDate, endDate}
        });
    }

    static getBuyers({id, startDate, endDate}) {
        return api.get(`/super-admin/stores/${id}/buyers`, {
            params: {startDate, endDate}
        });
    }

    static createStore({name, city, country, latitude, longitude, logo}) {
        return api.post(`super-admin/stores/create`, {
            name,
            logo,
            location: {
                city,
                country,
                latitude,
                longitude,
            }
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    static updateStore({id, name, city, country, latitude, longitude, logo}) {
        return api.put(`super-admin/stores/${id}`, {
            name,
            logo,
            location: {
                city,
                country,
                latitude,
                longitude,
            }
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    static deleteStores(id) {
        return api.delete(`super-admin/stores/${id}`);
    }

    static getAdmin({id}) {
        return api.get(`/super-admin/stores/admins/${id}`);
    }

    static createAdmin({email, storeId}) {
        return api.post(`/super-admin/stores/assign-user`, {email, storeId});
    }

    static removeAdmin({adminId, storeId}) {
        return api.put(`/super-admin/remove-admin`, {adminId, storeId});
    }
    static getUsers({limit,page,role}) {
        return api.get(`/super-admin/all-users`,{
            params: {limit,page,role},
        });
    }

}
