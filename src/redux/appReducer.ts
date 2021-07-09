import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes, AppStateType } from './reduxStore';
import { getAuthUserData } from './authReducer';

let initialState = {
    initialized: false as boolean,
    notifyError: false as boolean,
    errorMessage: null as string | null,
    errorCode: null as number | null
};
type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: AppActionTypes): InitialStateType => {
    switch (action.type) {
        case 'VK/APP/INIT_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        case 'VK/APP/NEW_ERROR':
            return {
                ...state,
                notifyError: action.notifyError,
                errorMessage: action.errorMessage,
                errorCode: action.errorCode
            }
        default:
            return state;
    };
};

//ACTION-CREATORS
type AppActionTypes = InferActionsTypes<typeof appActions>
export const appActions = {
    initSuccess: () => ({ type: 'VK/APP/INIT_SUCCESS' } as const),
    showError: (notifyError: boolean, errorMessage: string, errorCode: number) => ({ type: 'VK/APP/NEW_ERROR', notifyError, errorMessage, errorCode } as const)
}


//THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AppActionTypes>

export const initApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(appActions.initSuccess());
    });
}
export const showErrorThunk = (notifyError: boolean, errorMessage: string, errorCode: number): ThunkType => async (dispatch) => {
    dispatch(appActions.showError(notifyError, errorMessage, errorCode))
    //setTimeout(() => { dispatch(appActions.showError(false, '', {})) }, 10000)
}

export default appReducer;