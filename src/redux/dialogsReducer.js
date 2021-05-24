const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogsData: [
        { id: 1, name: 'Alex' },
        { id: 2, name: 'Diana' },
        { id: 3, name: 'Putin' },
        { id: 4, name: 'Obama' }
    ],
    messages: [
        {id: 1, message: 'https://youtu.be/MM02LsZqssQ?t=1056'}
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {id: Math.floor(Math.random() * (1000)),
                    message: action.newMessageText}
                ]
            };
        
        default:
            return state;
    }
};

//ACTION_CREATORS
export const sendMessage = (newMessageText) => ({ type: SEND_MESSAGE, newMessageText });

export default dialogsReducer;