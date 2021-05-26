import React from 'react';
import User from './User';
import s from './Users.module.css';

let Users = (props) => {
    return <div>
        <div className={s.wrapper}>
            {props.users.map(u =>
                <User
                    key={u.id}
                    user={u}
                    followingInProgress={props.followingInProgress}
                    follow={props.follow}
                    unfollow={props.unfollow}
                />
            )}
        </div>
    </div>
}

export default Users;