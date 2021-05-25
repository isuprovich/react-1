import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Users.module.css';

let User = ({user, followingInProgress, follow, unfollow}) => {
    return <div key={user.id} className={s.userCard}>
        <img src={user.photos.small != null ? user.photos.small : "avatar_placeholder.png"} alt="User avatar" className={s.userAva100} />
        <NavLink to={'/profile/' + user.id} className={s.navLink}>{user.name}</NavLink>
        <div className={s.textOverflow}>{user.status}</div>
        <div className={s.followButtons}>
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
        </div>
    </div>
}

export default User;