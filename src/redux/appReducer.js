import { getAuthUserData } from './authReducer';

const INIT_SUCCESS = 'INIT_SUCCESS';

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    };
};

//ACTION-CREATORS
export const initSuccess = () => ({ type: INIT_SUCCESS });

//THUNKS
export const initApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initSuccess());
    });
}

export default appReducer;