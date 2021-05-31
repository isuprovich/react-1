import React from 'react'
import s from './ProfileInfo.module.css';

const ProfileInfo = ({ profile, myId, profileEditToggle }) => {
    return (
        <div className={s.profileInfo}>
            {myId === profile.userId && <div
                className={s.editProfile}
                onClick={profileEditToggle}
            ></div>}
            <div>Ищу работу: {profile.lookingForAJob ? "да" : "нет"}</div>
            <div>Описание: {profile.lookingForAJobDescription}</div>
            <div>Обо мне: {profile.aboutMe}</div>
            {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.refWrapper}><span>{key}:</span> <a className={s.ref} href={profile.contacts[key]} target="_blank" rel="noreferrer">{profile.contacts[key]}</a></div>
            })}
        </div>
    );
}

export default ProfileInfo;