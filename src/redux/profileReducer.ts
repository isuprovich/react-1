import { profileAPI } from '../API/profileAPI';
import { stopSubmit } from 'redux-form';
import { showErrorThunk } from './appReducer';
import { PhotosType, PostsType, ProfileType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './reduxStore';
import { fetchActions, FetchActionTypes } from './fetchReducer';

let initialState = {
    newPostText: '' as string,
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
    profileEditToggle: () => ({ type: 'PROFILE_EDIT_TOGGLE' } as const)
}

//THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FetchActionTypes>

export const getProfile = (userId: number | null): ThunkType => async (dispatch) => {
    try {
        dispatch(fetchActions.toggleIsFetching(true));
        let response = await profileAPI.getProfile(userId)
        dispatch(profileActions.setUserProfile(response));
        dispatch(fetchActions.toggleIsFetching(false));
    } catch (error) {
        dispatch(showErrorThunk(true, `Пользователь с id ${userId} не найден`))
    }
}
export const updateProfileInfoThunk = (newProfileInfo: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.updateProfileInfo(newProfileInfo)
    if (data.resultCode === 0) {
        dispatch(getProfile(userId))
        dispatch(profileActions.profileEditToggle())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "ОШИБКА"
        dispatch(stopSubmit('profile-edit', { _error: message }))
    }
}
export const getStatus = (userId: number | null): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfileStatus(userId)
    dispatch(profileActions.setUserStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(profileActions.setUserStatus(status));
    }
}
export const saveAva = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.uploadAva(file)
    if (data.resultCode === 0) {
        dispatch(profileActions.updateAvaSuccess(data.data.photos))
    }
}

export default profileReducer;