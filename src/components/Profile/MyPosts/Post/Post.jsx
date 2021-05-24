import React from 'react'
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src='/avatar_placeholder.png' alt='ava' />
            <div className={s.userName}>{`${props.user}${props.id}`}</div>
            <div className={s.post}>{props.message}</div>
        </div>
    );
}

export default Post;