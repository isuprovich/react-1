import React from 'react';
import { useHistory } from 'react-router-dom';
import { DialogType } from '../../../redux/dialogsReducer';
import { Card, Avatar, Row, Col, Typography } from 'antd';
const {Text, Title} = Typography

const Dialog: React.FC<DialogType> = ({id, name}) => {
    const history = useHistory();
    const routeChange = (id: number) => {
        let path = '/dialogs/' + id
        history.push(path)
    }
    return (
        <Card style={{ width: 200, cursor: 'pointer' }} onClick={() => routeChange(id)}>
            <Row gutter={[16, 16]}>
                <Col>
                    <Avatar size={60}>{name}</Avatar>
                </Col>
                <Col>
                    <Title level={4}>{name}</Title>
                    <Text type="secondary">Online</Text>
                </Col>
            </Row>
        </Card>
    );
}

export default Dialog;