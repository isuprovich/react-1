const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    isFetching: true as boolean
}
type InitialStateType = typeof initialState

const fetchReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    };
};

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching });

export default fetchReducer;