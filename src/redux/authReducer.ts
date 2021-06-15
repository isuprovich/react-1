import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { authAPI, ResultCodeCaptchaEnum, ResultCodeEnum } from '../API/api';
import { AppStateType } from './reduxStore';

const SET_USER_DATA = 'my-app/auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'my-app/auth/SET_CAPTCHA_URL';
const TOGGLE_CAPTCHA = 'my-app/auth/TOGGLE_CAPTCHA';

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: undefined as string | undefined,
    needCaptcha: false as boolean
}
type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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
type ActionTypes = SetAuthUserDataType | ToggleCaptchaType | GetCaptchaUrlType
//=================================SetAuthUserData==================================//
type SetAuthUserDataPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => ({
    type: SET_USER_DATA, payload: { id, email, login, isAuth }
});

//=================================ToggleCaptchaData==================================//
type ToggleCaptchaType = {
    type: typeof TOGGLE_CAPTCHA,
    needCaptcha: boolean
}
export const toggleCaptcha = (needCaptcha: boolean): ToggleCaptchaType => ({ type: TOGGLE_CAPTCHA, needCaptcha });

//=================================GetCaptchaUrl==================================//
type GetCaptchaUrlType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string | undefined
}
export const getCaptchaUrl = (captchaUrl: string): GetCaptchaUrlType => ({ type: SET_CAPTCHA_URL, captchaUrl });

//THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean): ThunkType => async (dispatch) => {
    dispatch(toggleCaptcha(false));
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else if (data.resultCode === ResultCodeCaptchaEnum.CapthchaIsRequired) {
        let responseCaptcha = await authAPI.captcha()
        dispatch(toggleCaptcha(true));
        dispatch(getCaptchaUrl(responseCaptcha.url))
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "ОШИБКА"
        //@ts-ignore
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptcha = () => async (dispatch: any) => {
    let data = await authAPI.captcha()
    dispatch(getCaptchaUrl(data.url))
}

export default authReducer;