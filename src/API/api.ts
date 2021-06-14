import axios from 'axios';
import { ProfileType } from '../types/types';

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { 'API-KEY': '45bf7595-daa3-4596-8932-c7910484d1d2' }
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    followUser(userid: number) {
        return axiosInstance.post(`follow/${userid}`)
            .then(response => response.data.resultCode);
    },
    unfollowUser(userid: number) {
        return axiosInstance.delete(`follow/${userid}`)
            .then(response => response.data.resultCode);
    }
}

export const profileAPI = {
    getProfile(userid: number) {
        return axiosInstance.get(`profile/${userid}`)
    },
    getProfileStatus(userid: number) {
        return axiosInstance.get(`profile/status/${userid}`)
    },
    updateStatus(status: string) {
        return axiosInstance.put(`profile/status`, { status })
    },
    updateProfileInfo(newProfileData: ProfileType) {
        return axiosInstance.put(`profile`, newProfileData)
    },
    uploadAva(file: any) {
        const formData = new FormData();
        formData.append("image", file)
        return axiosInstance.put(`profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptchaEnum {
    CapthchaIsRequired = 10
}
type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodeEnum | ResultCodeCaptchaEnum
    messages: Array<string>
}
type LogoutResponseType = {
    data: {}
    resultCode: ResultCodeEnum 
    messages: Array<string>
}
type CaptchaResponseType = {
    url: string
}

export const authAPI = {
    me() {
        return axiosInstance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha = false) {
        return axiosInstance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return axiosInstance.delete<LogoutResponseType>(`auth/login`).then(res => res.data)
    },
    captcha() {
        return axiosInstance.get<CaptchaResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}