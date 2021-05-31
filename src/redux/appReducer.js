import { getAuthUserData } from './authReducer';

const INIT_SUCCESS = 'INIT_SUCCESS';
const ERROR = 'NEW_ERROR';

let initialState = {
    initialized: false,
    notifyError: false,
    errorMessage: null
}

const appReducer = (state = initialState, action) => {
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
export const initSuccess = () => ({ type: INIT_SUCCESS });
export const showError = (notifyError, errorMessage) => ({ type: ERROR, notifyError, errorMessage })

//THUNKS
export const initApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initSuccess());
    });
}
export const showErrorThunk = (notifyError, errorMessage) => (dispatch) => {
    dispatch(showError(notifyError, errorMessage))
    setTimeout(() => {dispatch(showError(false, null))}, 10000)
}

export default appReducer;