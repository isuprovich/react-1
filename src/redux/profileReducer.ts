import { profileAPI } from '../API/api';
import { stopSubmit } from 'redux-form';
import { showErrorThunk } from './appReducer';
import { PhotosType, PostsType, ProfileType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './reduxStore';
import { fetchActions, FetchActionTypes } from './fetchReducer';

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
        case 'ADD_POST': {
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
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'UPDATE_AVA_SUCCESS':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: { ...action.photos }
                } as ProfileType
            }
        case 'PROFILE_EDIT_TOGGLE':
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
type ActionTypes = InferActionsTypes<typeof profileActions>
export const profileActions = {
    addPost: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SET_PROFILE', profile } as const),
    setUserStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    updateAvaSuccess: (photos: PhotosType) => ({ type: 'UPDATE_AVA_SUCCESS', photos } as const),
    profileEditToggle: () => ({type: 'PROFILE_EDIT_TOGGLE'} as const)
}

//THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FetchActionTypes>

export const getProfile = (userid: number | null): ThunkType => async (dispatch) => {
    try {
        dispatch(fetchActions.toggleIsFetching(true));
        let response = await profileAPI.getProfile(userid)
        dispatch(profileActions.setUserProfile(response.data));
        dispatch(fetchActions.toggleIsFetching(false));
    } catch(error) {
        dispatch(showErrorThunk(true, `Пользователь с id ${userid} не найден`))
    }
}
export const updateProfileInfoThunk = (newProfileInfo: any): ThunkType => async (dispatch, getState) => {
    const userid = getState().auth.id;
    const response = await profileAPI.updateProfileInfo(newProfileInfo)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userid))
        dispatch(profileActions.profileEditToggle())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "ОШИБКА"
        dispatch(stopSubmit('profile-edit', { _error: message }))
    }
}
export const getStatus = (userid: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfileStatus(userid)
    dispatch(profileActions.setUserStatus(response.data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(profileActions.setUserStatus(status));
    }
}
export const saveAva = (file: any): ThunkType => async (dispatch) => {
    let response = await profileAPI.uploadAva(file)
    if (response.data.resultCode === 0) {
        dispatch(profileActions.updateAvaSuccess(response.data.data.photos))
    }
}

export default profileReducer;