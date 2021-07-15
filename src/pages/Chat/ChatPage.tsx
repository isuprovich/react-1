import React from 'react'
import { Popover, Button, Row, Col, Form, Input, Divider } from 'antd';
import { SendOutlined, MessageOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Resizable } from 're-resizable';
import { useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { getMyId } from '../../redux/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer';
import { getMessages } from '../../redux/chatSelectors';

const ChatBtn: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const handleChatVisible = (visible: boolean) => { setVisible(visible) }
    //const hideChat = () => { setVisible(false) }
    return (
        <Popover
            placement="topRight"
            content={<Chat />}
            title="Чат"
            trigger="click"
            visible={visible}
            onVisibleChange={handleChatVisible}
        >
            <Button type='primary' danger style={{ display: 'block', position: 'fixed', zIndex: 999, bottom: '2%', right: '2%' }}><MessageOutlined />Чат</Button>
        </Popover>
    );
}

const Chat: React.FC = () => {
    const myId = useSelector(getMyId)
    const messages = useSelector(getMessages)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    const [form] = Form.useForm()
    const onSend = (values: any) => {
        dispatch(sendMessage(values.message))
        form.resetFields()
    }

    return <div>
        <Resizable
            style={{ display: "flex", flexDirection: 'column' }}
            enable={{ top:true, right:false, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:true }}
            defaultSize={{ width: '30vw', height: '30vh' }}
            minWidth={'20vw'}
            minHeight={'30vh'}
            maxWidth={'50vw'}
            maxHeight={'70vh'}
        >
            <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingBottom: '5px' }}>
                {messages.map((m, index) => <ChatMessage key={index} message={m} myId={myId} />)}
            </div>
        </Resizable>
        <Divider></Divider>
        <Form
            name='send-message-form'
            onFinish={onSend}
            form={form}
            style={{margin: '0 10px'}}
        >
            <Row gutter={[8, 8]} style={{ width: '100%', marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
                <Col flex={'auto'}>
                    <Form.Item name='message'>
                        <Input.TextArea autoSize={{ minRows: 1, maxRows: 1 }} placeholder="Введите текст" />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item>
                        <Button type={"primary"} htmlType="submit"><SendOutlined /></Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </div>
}

export default ChatBtn