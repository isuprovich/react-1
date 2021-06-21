import { InferActionsTypes } from './reduxStore';
export type DialogType = {
    id: number,
    name: string
}
export type MessageType = {
    id: number,
    message: string | null
}
let initialState = {
    dialogsData: [
        { id: 1, name: 'Alex' },
        { id: 2, name: 'Diana' },
        { id: 3, name: 'Putin' },
        { id: 4, name: 'Obama' }
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'https://youtu.be/MM02LsZqssQ?t=1056'}
    ] as Array<MessageType>
}
export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: DialogsActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {id: Math.floor(Math.random() * (1000)),
                    message: action.newMessageText}
                ]
            }
        
        default:
            return state
    }
}

//ACTION_CREATORS
export type DialogsActionTypes = InferActionsTypes<typeof dialogsActions>
export const dialogsActions = {
    sendMessage: (newMessageText: string) => ({ type: 'SEND_MESSAGE', newMessageText } as const)
}

export default dialogsReducer