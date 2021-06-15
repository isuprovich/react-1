import { InferActionsTypes } from './reduxStore';
let initialState = {
    isFetching: true as boolean
}
type InitialStateType = typeof initialState

const fetchReducer = (state = initialState, action: FetchActionTypes): InitialStateType => {
    switch (action.type) {
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    };
};

export type FetchActionTypes = InferActionsTypes<typeof fetchActions>

export const fetchActions = {
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching })
}

export default fetchReducer;