import { Dispatch } from 'redux';
import { getAuthUserData } from './authReducer';

const INIT_SUCCESS = 'INIT_SUCCESS';
const ERROR = 'NEW_ERROR';

let initialState = {
    initialized: false as boolean,
    notifyError: false as boolean,
    errorMessage: null as string | null
};
type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INIT_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case ERROR:
            return {
                ...state,
                notifyError: action.notifyError,
                errorMessage: action.errorMessage
            }
        default:
            return state;
    };
};

//ACTION-CREATORS
type InitSuccessActionType = { type: typeof INIT_SUCCESS }
type ErrorActionType = {
    type: typeof ERROR
    notifyError: boolean,
    errorMessage: string | null
}
type ActionTypes = InitSuccessActionType | ErrorActionType
export const initSuccess = (): InitSuccessActionType => ({ type: INIT_SUCCESS });
export const showError = (notifyError: boolean, errorMessage: string): ErrorActionType => ({ type: ERROR, notifyError, errorMessage })

//THUNKS

export const initApp = () => (dispatch: Dispatch<ActionTypes | any>) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initSuccess());
    });
}
export const showErrorThunk = (notifyError: boolean, errorMessage: string) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch(showError(notifyError, errorMessage))
    setTimeout(() => { dispatch(showError(false, '')) }, 10000)
}

export default appReducer;