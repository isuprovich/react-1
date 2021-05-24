import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Users.module.css';

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let startPosition = 0;
    if (props.currentPage > 5) {
        startPosition = props.currentPage - 6
    }
    return <div>
        <div className={s.pageButtonsWrapper}>
            <span
                className={s.pageButton}
                onClick={() => { if (props.currentPage > 1) { props.onPageChange(props.currentPage - 1) } }}>{'<'}
            </span>
            {pages.slice(startPosition, props.currentPage + 5).map(p => {
                return <div className={s.pageButton} key={p}>
                    <div
                        className={props.currentPage === p ? `${s.pageButton} ${s.selectedPage}` : undefined}
                        onClick={() => { props.onPageChange(p) }}>
                        {p}
                    </div>
                </div>
            })}
            <span
                className={s.pageButton}
                onClick={() => { if (props.currentPage < pagesCount) { props.onPageChange(props.currentPage + 1) } }}>{'>'}
            </span>
        </div>
        <div className={s.wrapper}>
            {
                props.users.map(u =>
                    <div key={u.id} className={s.userCard}>
                        <img src={u.photos.small != null ? u.photos.small : "avatar_placeholder.png"} alt="User avatar" className={s.userAva100} />
                        <NavLink to={'/profile/' + u.id} className={s.navLink}>{u.name}</NavLink>
                        <div className={s.textOverflow}>{u.status}</div>
                        <div className={s.followButtons}>
                            {u.followed
                                ? <button
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                    className={s.unfollowButton}
                                    onClick={() => { props.unfollow(u.id) }}>Отписаться</button>
                                : <button
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                    className={s.followButton}
                                    onClick={() => { props.follow(u.id) }}>Подписаться</button>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    </div>
}

export default Users;