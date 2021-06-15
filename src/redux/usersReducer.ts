import { UsersType } from './../types/types';
import { usersAPI } from '../API/api';
import { updateObjectInArray } from '../utils/objectHelpers/objectHelpers';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './reduxStore';

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 13 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    followingInProgress: [] as Array<number> // array of userId
};
type InitialStateType = typeof initialState

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
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', followingInProgress, userId } as const)
}
//THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UsersActionTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(usersActions.setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.setTotalUsersCount(data.totalCount))
}
const _followUnfollowFlow = async (
        dispatch: Dispatch<UsersActionTypes>, 
        userId: number, 
        apiMethod: any, 
        actionCreator: (userId: number) => UsersActionTypes) => {
    dispatch(usersActions.toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(usersActions.toggleFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), usersActions.followSuccess)
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), usersActions.unfollowSuccess)
}

export default usersReducer;