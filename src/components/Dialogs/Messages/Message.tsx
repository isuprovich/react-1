import React from 'react';
import { MessageType } from '../../../redux/dialogsReducer';
import { Card, Avatar, Row, Col, Typography } from 'antd';
const { Text, Title } = Typography

const Message: React.FC<MessageType> = (props) => {
    return (
        <Card style={{ maxWidth: '80%' }}>
            <Row gutter={[16, 16]}>
                <Col>
                    <Avatar size={60}>{props.id}</Avatar>
                </Col>
                <Col>
                    <Row>
                        <Title level={5}>Message ID: {props.id}</Title>
                    </Row>
                    <Row>
                        <Text>{props.message}</Text>
                    </Row>
                </Col>
            </Row>
        </Card>
        // <div className={s.incomingMessage}>
        //     <img className={s.avaSmall} src={avaPlaceholder} alt="ava" />
        //     <div className={s.nameField}>Message ID: {props.id}</div>
        //     <div className={s.messageText}>{props.message}</div>
        // </div>
    );
}

export default Message;