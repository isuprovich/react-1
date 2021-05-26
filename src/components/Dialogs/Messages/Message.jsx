import React from 'react';
import s from './Message.module.css';

const Message = (props) => {
    return (
        <div className={s.incomingMessage}>
            <img className={s.avaSmall} src="avatar_placeholder.png" alt="ava" />
            <div className={s.nameField}>Message ID: {props.id}</div>
            <div className={s.messageText}>{props.message}</div>
        </div>
    );
}

export default Message;