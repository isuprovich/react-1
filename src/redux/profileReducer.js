import { toggleIsFetching } from './fetchReducer';
import { profileAPI } from '../API/api';

const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const PROFILE_EDIT_TOGGLE = 'PROFILE_EDIT_TOGGLE'
const UPDATE_AVA_SUCCESS = 'UPDATE_AVA_SUCCESS';

let initialState = {
    profile: null,
    status: '',
    profileEditMode: false,
    posts: [
        { id: 1, user: 'Admin', message: 'https://youtu.be/_X3dVadZp2U?t=406' }
    ]
};

const profileReducer = (state = initialState, action) => {
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
                }
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
export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_STATUS, status });
export const updateAvaSuccess = (photos) => ({ type: UPDATE_AVA_SUCCESS, photos })
export const profileEditToggle = () => ({type: PROFILE_EDIT_TOGGLE})

//THUNKS
export const getProfile = (userid) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await profileAPI.getProfile(userid)
    dispatch(setUserProfile(response.data));
    dispatch(toggleIsFetching(false));
}
export const getStatus = (userid) => async (dispatch) => {
    let response = await profileAPI.getProfileStatus(userid)
    dispatch(setUserStatus(response.data));
}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}
export const saveAva = (file) => async (dispatch) => {
    let response = await profileAPI.uploadAva(file)
    if (response.data.resultCode === 0) {
        dispatch(updateAvaSuccess(response.data.data.photos))
    }
}

export default profileReducer;