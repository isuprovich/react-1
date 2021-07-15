import { AppStateType } from "./reduxStore";

export const getMessages = (state: AppStateType) => {
    return state.chat.messages
}