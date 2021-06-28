import { AppStateType } from "./reduxStore";

export const getMyId = (state: AppStateType) => {
    return state.auth.id
}
export const getMyLogin = (state: AppStateType) => {
    return state.auth.login
}
export const getCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl
}
export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const getIsNeedCaptcha = (state: AppStateType) => {
    return state.auth.needCaptcha
}