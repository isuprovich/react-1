import { toggleIsFetching } from './fetchReducer';
import { profileAPI } from '../API/api';

const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    profile: null,
    status: '',
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
        default:
            return state;
    }
};

//ACTION-CREATORS
export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_PROFILE, profile })
export const setUserStatus = (status) => ({ type: SET_STATUS, status })

//THUNKS
export const getProfile = (userid) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        profileAPI.getProfile(userid).then(response => {
            dispatch(toggleIsFetching(false));
            dispatch(setUserProfile(response.data));
        });
    }
}
export const getStatus = (userid) => {
    return (dispatch) => {
        profileAPI.getProfileStatus(userid).then(response => {
            dispatch(setUserStatus(response.data));
            console.log(`Got status: ${response.data}`)
        })
    }
}
export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status));
                console.log('Status changed (updateStatus)')
            }
        })
    }
}

export default profileReducer;