import { UsersType } from './../types/types';
import { usersAPI } from '../API/api';
import { updateObjectInArray } from '../utils/objectHelpers/objectHelpers';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './reduxStore';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 13 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    followingInProgress: [] as Array<number> // array of userId
};
type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        default:
            return state;
    }
};

//ACTION-CREATORS
type ActionTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType | ToggleFollowingProgressType

type FollowSuccessType = {
    type: typeof FOLLOW, 
    userId: number
}
type UnfollowSuccessType = {
    type: typeof UNFOLLOW, 
    userId: number
}
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UsersType>
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress: boolean,
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessType => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({ type: UNFOLLOW, userId });
export const setUsers = (users: Array<UsersType>): SetUsersType => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleFollowingProgress = (followingInProgress: boolean, userId: number): ToggleFollowingProgressType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId });

//THUNKS

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount))
}

const _followUnfollowFlow = async (
        dispatch: Dispatch<ActionTypes>, 
        userId: number, 
        apiMethod: any, 
        actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followSuccess)
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess)
}

export default usersReducer;