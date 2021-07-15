import { chatAPI } from './../API/chatAPI';
import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes, AppStateType } from './reduxStore';
import { ChatMessageType } from "../API/chatAPI"
import { Dispatch } from 'redux';

const initialState = {
    messages: [] as ChatMessageType[]
}
type InitialStateType = typeof initialState

const chatReducer = (state = initialState, action: ChatActionTypes): InitialStateType => {
    switch (action.type) {
        case 'REACTVK/CHAT/MESSAGES_RECIEVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

//Chat Action Creators
export type ChatActionTypes = InferActionsTypes<typeof chatActions>
export const chatActions = {
    messagesRecieved: (messages: ChatMessageType[]) => ({
        type: 'REACTVK/CHAT/MESSAGES_RECIEVED', payload: { messages }
    } as const)
}

//Chat Thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ChatActionTypes>
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        return _newMessageHandler = (messages) => {
            dispatch(chatActions.messagesRecieved(messages))
        }
    }
    return _newMessageHandler
}
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer