import { stopSubmit } from 'redux-form';
import { authAPI } from '../API/api';

const SET_USER_DATA = 'my-app/auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'my-app/auth/SET_CAPTCHA_URL';
const TOGGLE_CAPTCHA = 'my-app/auth/TOGGLE_CAPTCHA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    needCaptcha: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case TOGGLE_CAPTCHA:
            return {
                ...state,
                needCaptcha: action.needCaptcha
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    };
};

//ACTION-CREATORS
export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } });
export const toggleCaptcha = (needCaptcha) => ({ type: TOGGLE_CAPTCHA, needCaptcha });
export const getCaptchaUrl = (captchaUrl) => ({ type: SET_CAPTCHA_URL, captchaUrl });

//THUNKS
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    dispatch(toggleCaptcha(false));
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else if (response.data.resultCode === 10) {
        let responseCaptcha = await authAPI.captcha()
        dispatch(toggleCaptcha(true));
        dispatch(getCaptchaUrl(responseCaptcha.data.url))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "ОШИБКА"
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptcha = () => async (dispatch) => {
    let response = await authAPI.captcha()
    console.log(response.data.url)
    dispatch(getCaptchaUrl(response.data.url))
}

export default authReducer;