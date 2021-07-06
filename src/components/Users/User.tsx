import React from 'react';
import { Link } from 'react-router-dom';
import s from './Users.module.css';
import avaPlaceholder from '../../assets/avatar_placeholder.png'
import { UsersType } from '../../types/types';
import { Card, Avatar, Button, Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import { UserAddOutlined, UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
const { Meta } = Card;

type PropsType = {
    user: UsersType,
    myId: number | null,
    followingInProgress: Array<number>,
    followUser: (userId: number) => void,
    unfollowUser: (userId: number) => void,
}

const User: React.FC<PropsType> = React.memo(({ user, myId, followingInProgress, followUser, unfollowUser }) => {
    return (
        <Card
            style={{ width: "400px" }}
            key={user.id}
            actions={[
                <Button type={'link'}><Link to={'/profile/' + user.id} style={{ color: '#1890ff' }}><UserOutlined /></Link></Button>,
                <Button
                    type={'link'}
                    icon={<UserAddOutlined />}
                    loading={followingInProgress.some(id => id === user.id)}
                    onClick={() => { followUser(user.id) }}
                    disabled={user.followed} />,
                <Button
                    type={'link'} danger
                    icon={<UserDeleteOutlined />}
                    loading={followingInProgress.some(id => id === user.id)}
                    onClick={() => { unfollowUser(user.id) }}
                    disabled={!user.followed} />
            ]}
        >
            <Row gutter={[16, 8]} align={'middle'}>
                <Col><Avatar size={64} src={user.photos.small} alt={user.name}>{user.name}</Avatar></Col>
                <Col>
                    <Row><Title level={4}>{user.name}</Title></Row>
                    <Row>{user.status}</Row>
                </Col>

            </Row>
        </Card>
        // <Col>
        // {user.followed
        //     ? <Button
        //         type="primary" danger
        //         loading={followingInProgress.some(id => id === user.id)}
        //         onClick={() => { unfollowUser(user.id) }}>Отписаться</Button>
        //     : <Button
        //         loading={followingInProgress.some(id => id === user.id)}
        //         onClick={() => { followUser(user.id) }}>Подписаться</Button>
        // }
        // </Col>
        // <div key={user.id} className={s.userCard}>
        //     <img src={user.photos.small != null ? user.photos.small : avaPlaceholder} alt="User avatar" className={s.userAva100} />
        //     <NavLink to={'/profile/' + user.id} className={s.navLink}>{user.name}</NavLink>
        //     <div className={s.textOverflow}>{user.status}</div>
        //     {myId !== user.id && <div className={s.followButtons}>

        //     </div>}
        // </div>
    )
})

export default User;