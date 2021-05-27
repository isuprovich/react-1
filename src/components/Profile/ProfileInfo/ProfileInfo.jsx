import React from 'react'
import s from './ProfileInfo.module.css';

const ProfileInfo = ({ profile, myId }) => {
    let test = () => {
        alert('AAAAAAAA')
    }
    return (
        <div className={s.profileInfo}>
            {myId === profile.userId && <div
                className={s.editProfile}
                onClick={test}
            ></div>}
            <div>Ищу работу: {profile.lookingForAJob ? "да" : "нет"}</div>
            <div>Обо мне: {profile.aboutMe}</div>
            <div>ВК: {profile.contacts.vk}</div>
            <div>Instagram: {profile.contacts.instagram}</div>
            <div>Github: {profile.contacts.github}</div>
            <div>facebook: {profile.contacts.facebook}</div>
            <div>twitter: {profile.contacts.twitter}</div>
            <div>website: {profile.contacts.website}</div>
            <div>youtube: {profile.contacts.youtube}</div>
            <div>mainLink: {profile.contacts.mainLink}</div>
        </div>
    );
}

export default ProfileInfo;