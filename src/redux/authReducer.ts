import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { ResultCodeCaptchaEnum, ResultCodeEnum } from '../API/api';
import { authAPI } from '../API/authAPI';
import { AppStateType, InferActionsTypes } from './reduxStore';

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: undefined as string | undefined,
    needCaptcha: false as boolean
}
type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: AuthActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'TOGGLE_CAPTCHA':
            return {
                ...state,
                needCaptcha: action.needCaptcha
            }
        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    };
};

//ACTION-CREATORS
export type AuthActionTypes = InferActionsTypes<typeof authActions>

export const authActions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA', payload: { id, email, login, isAuth }} as const),
    toggleCaptcha: (needCaptcha: boolean) => ({ type: 'TOGGLE_CAPTCHA', needCaptcha } as const),
    getCaptchaUrl: (captchaUrl: string) => ({ type: 'SET_CAPTCHA_URL', captchaUrl } as const)
}

//THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionTypes>
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = meData.data;
        dispatch(authActions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    dispatch(authActions.toggleCaptcha(false));
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else if (data.resultCode === ResultCodeCaptchaEnum.CapthchaIsRequired) {
        let responseCaptcha = await authAPI.captcha()
        dispatch(authActions.toggleCaptcha(true));
        dispatch(authActions.getCaptchaUrl(responseCaptcha.url))
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "ОШИБКА"
        //@ts-ignore
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(authActions.setAuthUserData(null, null, null, false));
    }
}

export const getCaptcha = () => async (dispatch: any) => {
    let data = await authAPI.captcha()
    dispatch(authActions.getCaptchaUrl(data.url))
}

export default authReducer;