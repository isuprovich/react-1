const SEND_MESSAGE = 'SEND-MESSAGE'

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
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
type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
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

type SendMessageType = {
    type: typeof SEND_MESSAGE,
    newMessageText: string | null
}
export const sendMessage = (newMessageText: string): SendMessageType => ({ type: SEND_MESSAGE, newMessageText })

export default dialogsReducer