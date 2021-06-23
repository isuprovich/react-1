import { AppStateType } from "./reduxStore";

export const getMyId = (state: AppStateType) => {
    return state.auth.id
}