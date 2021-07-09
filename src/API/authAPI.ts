import { axiosInstance, ResponseType } from "./api";

type MeResponseDataType = { id: number, email: string, login: string }
type LoginResponseDataType = { userId: number }
type CaptchaResponseType = { url: string }

export const authAPI = {
    me() {
        return axiosInstance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return axiosInstance.post<ResponseType<LoginResponseDataType>>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return axiosInstance.delete(`auth/login`).then(res => res.data)
    },
    captcha() {
        return axiosInstance.get<CaptchaResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}