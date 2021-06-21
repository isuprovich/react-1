import React from 'react';
import s from './Message.module.css';
import avaPlaceholder from '../../../assets/avatar_placeholder.png'
import { MessageType } from '../../../redux/dialogsReducer';

const Message: React.FC<MessageType> = (props) => {
    return (
        <div className={s.incomingMessage}>
            <img className={s.avaSmall} src={avaPlaceholder} alt="ava" />
            <div className={s.nameField}>Message ID: {props.id}</div>
            <div className={s.messageText}>{props.message}</div>
        </div>
    );
}

export default Message;