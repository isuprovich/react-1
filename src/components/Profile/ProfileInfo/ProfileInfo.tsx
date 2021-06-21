import React from 'react'
import { ContactsType, ProfileType } from '../../../types/types';
import s from './ProfileInfo.module.css';

type ProfileInfoType = {
    profile: ProfileType,
    myId: number | null,
    profileEditToggle: () => void
}

const ProfileInfo: React.FC<ProfileInfoType> = ({ profile, myId, profileEditToggle }) => {
    return (
        <div className={s.profileInfo}>
            {myId === profile.userId && <div
                className={s.editProfile}
                onClick={profileEditToggle}
            ></div>}
            <div className={s.refWrapper}><span>Ищу работу:</span>{profile.lookingForAJob ? "да" : "нет"}</div>
            <div className={s.refWrapper}><span>Описание:</span>{profile.lookingForAJobDescription}</div>
            <div className={s.refWrapper}><span>Обо мне:</span>{profile.aboutMe}</div>
            {Object
                .keys(profile.contacts)
                .map((key) => {
                    return <div key={key} className={s.refWrapper}>
                        <span>{key}:</span>
                        <a className={s.ref} href={profile.contacts[key as keyof ContactsType]} target="_blank" rel="noreferrer">
                            {profile.contacts[key as keyof ContactsType] === null ? '-----' : profile.contacts[key as keyof ContactsType] === '' ? '-----' : profile.contacts[key as keyof ContactsType]}
                        </a>
                    </div>
                })}
        </div>
    );
}

export default ProfileInfo;