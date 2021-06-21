import React from 'react'
import s from './Post.module.css';
import avaPlaceholder from '../../../../assets/avatar_placeholder.png'

type PropsType = {
    user: string,
    id: number,
    message: string
}

const Post:React.FC<PropsType> = ({user, id, message}) => {
    return (
        <div className={s.item}>
            <img src={avaPlaceholder} alt='ava' />
            <div className={s.userName}>{`${user}${id}`}</div>
            <div className={s.post}>{message}</div>
        </div>
    );
}

export default Post;