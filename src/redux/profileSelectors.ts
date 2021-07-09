import { AppStateType } from "./reduxStore";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}