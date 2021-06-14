import React from 'react';
import { UsersType } from '../../types/types';
import User from './User';
import s from './Users.module.css';

type PropsType = {
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    follow: (usersId: number) => void,
    unfollow: (usersId: number) => void
}

let Users: React.FC<PropsType> = ({users, followingInProgress, follow, unfollow}) => {
    return <div>
        <div className={s.wrapper}>
            {users.map(u =>
                <User
                    key={u.id}
                    user={u}
                    followingInProgress={followingInProgress}
                    follow={follow}
                    unfollow={unfollow}
                />
            )}
        </div>
    </div>
}

export default Users;