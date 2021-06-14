import { toggleIsFetching, ToggleIsFetchingType } from './fetchReducer';
import { profileAPI } from '../API/api';
import { stopSubmit } from 'redux-form';
import { showErrorThunk } from './appReducer';
import { PhotosType, PostsType, ProfileType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './reduxStore';

const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const PROFILE_EDIT_TOGGLE = 'PROFILE_EDIT_TOGGLE'
const UPDATE_AVA_SUCCESS = 'UPDATE_AVA_SUCCESS';

let initialState = {
    profile: null as ProfileType | null,
    status: '' as string,
    profileEditMode: false as boolean,
    posts: [
        { id: 1, user: 'Admin', message: 'https://youtu.be/_X3dVadZp2U?t=406' }
    ] as Array<PostsType>
}
type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [
                    {
                        id: Math.floor(Math.random() * (100000)),
                        user: 'testUser',
                        message: action.newPostText
                    },
                    ...state.posts
                ]
            };
        }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case UPDATE_AVA_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: { ...action.photos }
                } as ProfileType
            }
        case PROFILE_EDIT_TOGGLE:
            let newMode = !state.profileEditMode
            return {
                ...state,
                profileEditMode: newMode
            }
        default:
            return state;
    }
};

//ACTION-CREATORS
type ActionTypes = AddPostType | SetUserProfileType | SetUserStatusType | UpdateAvaSuccessType | ProfileEditToggleType | ToggleIsFetchingType

type AddPostType = {
    type: typeof ADD_POST,
    newPostText: string
}
type SetUserProfileType = {
    type: typeof SET_PROFILE,
    profile: ProfileType
}
type SetUserStatusType = {
    type: typeof SET_STATUS,
    status: string
}
type UpdateAvaSuccessType = {
    type: typeof UPDATE_AVA_SUCCESS,
    photos: PhotosType
}
type ProfileEditToggleType = {
    type: typeof PROFILE_EDIT_TOGGLE
}
export const addPost = (newPostText: string): AddPostType => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({ type: SET_PROFILE, profile });
export const setUserStatus = (status: string): SetUserStatusType => ({ type: SET_STATUS, status });
export const updateAvaSuccess = (photos: PhotosType): UpdateAvaSuccessType => ({ type: UPDATE_AVA_SUCCESS, photos })
export const profileEditToggle = (): ProfileEditToggleType => ({type: PROFILE_EDIT_TOGGLE})

//THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getProfile = (userid: number | null): ThunkType => async (dispatch) => {
    try {
        dispatch(toggleIsFetching(true));
        let response = await profileAPI.getProfile(userid)
        dispatch(setUserProfile(response.data));
        dispatch(toggleIsFetching(false));
    } catch(error) {
        dispatch(showErrorThunk(true, `Пользователь с id ${userid} не найден`))
    }
}
export const updateProfileInfoThunk = (newProfileInfo: any): ThunkType => async (dispatch, getState) => {
    const userid = getState().auth.id;
    const response = await profileAPI.updateProfileInfo(newProfileInfo)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userid))
        dispatch(profileEditToggle())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "ОШИБКА"
        dispatch(stopSubmit('profile-edit', { _error: message }))
    }
}
export const getStatus = (userid: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfileStatus(userid)
    dispatch(setUserStatus(response.data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}
export const saveAva = (file: any): ThunkType => async (dispatch) => {
    let response = await profileAPI.uploadAva(file)
    if (response.data.resultCode === 0) {
        dispatch(updateAvaSuccess(response.data.data.photos))
    }
}

export default profileReducer;