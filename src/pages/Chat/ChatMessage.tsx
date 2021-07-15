import React from 'react';
import { Row, Col, Avatar, Typography } from 'antd';
import { ChatMessageType } from './ChatPage';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { userRedirect } from '../../utils/userRedirect';

const { Text } = Typography

export const ChatMessage: React.FC<{ message: ChatMessageType; myId: number | null}> = ({ message, myId }) => {
    const history = useHistory()
    const reverseMessage = {
        display: 'flex',
        flexDirection: 'row-reverse' as 'row-reverse',
        textAlign: 'end' as 'end',
        marginLeft: 'auto'
    }
    const messageStyle = {
        maxWidth: 'fit-content',
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
        padding: '5px'
    }
    const pointerStyle = {
        cursor: 'pointer' as 'pointer'
    }
    return <div style={myId === message.userId ? {margin: '5px 0 0 0', padding: '0px 9px 0 5px'} : {margin: '5px 0 0 0', padding: '0px 9px 0 9px'}}>
        <Row gutter={[8, 8]} style={myId === message.userId ? {...reverseMessage, ...messageStyle} : messageStyle}>
            <Col onClick={() => userRedirect(message.userId, history)} style={pointerStyle}>
                <Avatar size={48} src={message.photo}>{message.userName}</Avatar>
            </Col>
            <Col flex={'1'}>
                <Row align={'middle'} style={myId === message.userId ? reverseMessage : {}}>
                    <Text strong onClick={() => userRedirect(message.userId, history)} style={pointerStyle}>
                        {message.userName}
                    </Text>
                </Row>
                <Row align={'middle'} style={myId === message.userId ? reverseMessage : {}}>
                    {message.message}
                </Row>
            </Col>
        </Row>
    </div >
};
