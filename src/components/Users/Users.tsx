import React from 'react';
import { UsersType } from '../../types/types';
import User from './User';
import s from './Users.module.css';

type PropsType = {
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    myId: number | null
}

const Users: React.FC<PropsType> = ({users, followingInProgress, follow, unfollow, myId}) => {
    return <div>
        <div className={s.wrapper}>
            {users.map(u =>
                <User
                    key={u.id}
                    user={u}
                    followingInProgress={followingInProgress}
                    follow={follow}
                    unfollow={unfollow}
                    myId={myId}
                />
            )}
        </div>
    </div>
}

export default Users;