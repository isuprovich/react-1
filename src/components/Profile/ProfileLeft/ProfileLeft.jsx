import React from 'react'
import s from './ProfileLeft.module.css';
import StatusWithHooks from './Status/StatusWithHooks';
import avaPlaceholder from '../../../assets/avatar_placeholder.png'

const ProfileLeft = ({profile, myId, status, updateStatus, saveAva}) => {

    const avaNewSelected = (e) => {
        if (e.target.files.length) {
            saveAva(e.target.files[0])
        }
    }

    return (
        <div className={s.profileLeft}>
            <h2 className={s.username}>{profile.fullName}</h2>
            <StatusWithHooks status={status} updateStatus={updateStatus} />
            <div className={s.avaWrapper}>
                <img src={profile.photos.large != null ? profile.photos.large : avaPlaceholder} alt='ava' className={s.Ava} />
                {myId === profile.userId && <div className={s.changeAva}>
                    <input className={s.changeAvaInput} type="file" onChange={avaNewSelected} />
                </div>}
            </div>
            {myId !== profile.userId && <button className={s.friendsBtn}>Добавить в друзья</button>}
        </div>
    );
}

export default ProfileLeft;