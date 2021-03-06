import React from 'react';
import { useHistory } from 'react-router-dom';
import { UsersType } from '../../types/types';
import { Card, Avatar, Button, Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { userRedirect } from '../../utils/userRedirect';

type PropsType = {
    user: UsersType,
    myId: number | null,
    followingInProgress: Array<number>,
    followUser: (userId: number) => void,
    unfollowUser: (userId: number) => void,
}

const User: React.FC<PropsType> = React.memo(({ user, myId, followingInProgress, followUser, unfollowUser }) => {
    const history = useHistory();
    return (
        <Card style={{ width: "100%", marginBottom: "8px" }} key={user.id}>
            <Row gutter={[16, 8]} align={'middle'}>
                <Col><Avatar size={64} src={user.photos.small} alt={user.name}>{user.name}</Avatar></Col>
                <Col flex={'auto'} onClick={() => userRedirect(user.id, history)} style={{ cursor: 'pointer', width: 'avilable' }}>
                    <Row><Title level={4}>{user.name}</Title></Row>
                    <Row>{user.status}</Row>
                </Col>
                {myId !== user.id && <Col>
                    {user.followed
                        ? <Button
                            type={'primary'} danger
                            icon={<UserDeleteOutlined />}
                            loading={followingInProgress.some(id => id === user.id)}
                            onClick={() => { unfollowUser(user.id) }}
                            disabled={!user.followed}>Отписаться</Button>
                        : <Button
                            type={'primary'}
                            icon={<UserAddOutlined />}
                            loading={followingInProgress.some(id => id === user.id)}
                            onClick={() => { followUser(user.id) }}
                            disabled={user.followed}>Подписаться</Button>
                    }
                </Col>}
            </Row>
        </Card>
    )
})

export default User;