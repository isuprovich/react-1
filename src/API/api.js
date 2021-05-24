import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { 'API-KEY': '45bf7595-daa3-4596-8932-c7910484d1d2' }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    followUser(userid) {
        return axiosInstance.post(`follow/${userid}`)
            .then(response => response.data.resultCode);
    },
    unfollowUser(userid) {
        return axiosInstance.delete(`follow/${userid}`)
            .then(response => response.data.resultCode);
    }
}

export const profileAPI = {
    getProfile(userid) {
        return axiosInstance.get(`profile/${userid}`)
    },
    getProfileStatus(userid) {
        return axiosInstance.get(`profile/status/${userid}`)
    },
    updateStatus(status) {
        return axiosInstance.put(`profile/status`, { status })
    }
}

export const authAPI = {
    me() {
        return axiosInstance.get(`auth/me`)
    },
    login(email, password, rememberMe, captcha = false) {
        return axiosInstance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return axiosInstance.delete(`auth/login`)
    },
    captcha() {
        return axiosInstance.get(`security/get-captcha-url`)
    }
}