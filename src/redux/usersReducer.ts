import { UsersType } from '../types/types';
import { usersAPI } from '../API/usersAPI';
import { updateObjectInArray } from '../utils/objectHelpers/objectHelpers';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './reduxStore';
import { ResponseType, ResultCodeEnum } from '../API/api';
import { fetchActions, FetchActionTypes } from './fetchReducer';

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    followingInProgress: [] as Array<number>, // array of userId
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: UsersActionTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
};

//ACTION-CREATORS
type UsersActionTypes = InferActionsTypes<typeof usersActions>
export const usersActions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setFilter: (filter: FilterType) => ({ type: 'SET_FILTER', payload: filter } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', followingInProgress, userId } as const)
}
//THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UsersActionTypes | FetchActionTypes>

export const requestUsers = (currentPage: number, pageSize: number | undefined, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(fetchActions.toggleIsFetching(true))
    dispatch(usersActions.setCurrentPage(currentPage));
    dispatch(usersActions.setFilter(filter))
    let data = await usersAPI.getUsers(currentPage, pageSize, filter)
    if (data.error === null) {
        dispatch(usersActions.setUsers(data.items));
        dispatch(usersActions.setTotalUsersCount(data.totalCount))
        dispatch(fetchActions.toggleIsFetching(false))
    }
}
const _followUnfollowFlow = async (
    dispatch: Dispatch<UsersActionTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<ResponseType>,
    actionCreator: (userId: number) => UsersActionTypes) => {
    dispatch(usersActions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    let result = response.resultCode
    if (result === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(usersActions.toggleFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersActions.followSuccess)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), usersActions.unfollowSuccess)
    }
}

export default usersReducer;