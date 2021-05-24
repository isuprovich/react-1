import React from 'react'
import s from './ProfileInfo.module.css';
import StatusWithHooks from './Status/StatusWithHooks';

const ProfileInfo = (props) => {
    return (
        <div className={s.profileInfo}>
            <h2 className={s.username}>{props.profile.fullName}</h2>
            <StatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            <img src={props.profile.photos.large != null ? props.profile.photos.large : "../avatar_placeholder.png"} alt='ava' className={s.Ava} />
            <button className={s.friendsBtn}>Добавить в друзья</button>
            <div>ВК: {props.profile.contacts.vk}</div>
            <div>Instagram: {props.profile.contacts.instagram}</div>
            <div>Github: {props.profile.contacts.github}</div>
            <div>facebook: {props.profile.contacts.facebook}</div>
            <div>twitter: {props.profile.contacts.twitter}</div>
            <div>website: {props.profile.contacts.website}</div>
            <div>youtube: {props.profile.contacts.youtube}</div>
            <div>mainLink: {props.profile.contacts.mainLink}</div>
        </div>
    );
}

export default ProfileInfo;