import React from 'react'
import s from './ProfileInfo.module.css';

const ProfileInfo = ({ profile, myId, profileEditToggle }) => {
    return (
        <div className={s.profileInfo}>
            {myId === profile.userId && <div
                className={s.editProfile}
                onClick={profileEditToggle}
            ></div>}
            <div className={s.refWrapper}><span>Ищу работу:</span>{profile.lookingForAJob ? "да" : "нет"}</div>
            <div className={s.refWrapper}><span>Описание:</span>{profile.lookingForAJobDescription}</div>
            <div className={s.refWrapper}><span>Обо мне:</span>{profile.aboutMe}</div>
            {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.refWrapper}>
                    <span>{key}:</span>
                    <a className={s.ref} href={profile.contacts[key]} target="_blank" rel="noreferrer">
                        {profile.contacts[key] === null ? '-----' : profile.contacts[key] === '' ? '-----' : profile.contacts[key]}
                    </a>
                </div>
            })}
        </div>
    );
}

export default ProfileInfo;