import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Users.module.css';
import avaPlaceholder from '../../assets/avatar_placeholder.png'
import { UsersType } from '../../types/types';

type PropsType = {
    myId: number | null
    user: UsersType,
    followingInProgress: Array<number>,
    follow: (id: number) => void,
    unfollow: (id: number) => void
}

let User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow, myId}) => {
    return <div key={user.id} className={s.userCard}>
        <img src={user.photos.small != null ? user.photos.small : avaPlaceholder} alt="User avatar" className={s.userAva100} />
        <NavLink to={'/profile/' + user.id} className={s.navLink}>{user.name}</NavLink>
        <div className={s.textOverflow}>{user.status}</div>
        {myId !== user.id && <div className={s.followButtons}>
            {user.followed
                ? <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    className={s.unfollowButton}
                    onClick={() => { unfollow(user.id) }}>Отписаться</button>
                : <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    className={s.followButton}
                    onClick={() => { follow(user.id) }}>Подписаться</button>
            }
        </div>}
    </div>
}

export default User;