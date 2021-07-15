import { sendMessage } from "../redux/chatReducer"

export type ChatMessageType = {
    userId: number,
    message: string,
    photo: string,
    userName: string
}
type SubscriberType = (messages: ChatMessageType[]) => void

let subscribers = [] as Array<SubscriberType>
let ws: WebSocket | null

const closeChatHandler = () => {
    console.log('WS close')
    setTimeout(createChatWS, 3000)
}
const messagesHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
    console.log('WS message')
}
function createChatWS() {
    ws?.removeEventListener('close', closeChatHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeChatHandler)
    ws.addEventListener('message', messagesHandler)
}

export const chatAPI = {
    start() {
        createChatWS()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeChatHandler)
        ws?.removeEventListener('message', messagesHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}