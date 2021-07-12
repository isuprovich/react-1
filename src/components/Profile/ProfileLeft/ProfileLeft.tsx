import React, { ChangeEvent } from 'react'
import s from './ProfileLeft.module.css';
import StatusWithHooks from './Status/StatusWithHooks';
import { ProfileType } from '../../../types/types';
import ProfileEditorDrawer from '../ProfileEditor/ProfileEditorDrawer';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons'

const {Title, Text} = Typography

type ProfileLeftType = {
    profile: ProfileType,
    myId: number | null,
    status: string,
    updateStatus: () => void,
    saveAva: (file: File) => void
}

const ProfileLeft: React.FC<ProfileLeftType> = ({ profile, myId, status, updateStatus, saveAva }) => {
    const avaNewSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            saveAva(e.target.files[0])
        }
    }
    return (
        <div className={s.profileLeft}>
            <Title level={2} style={{textAlign: 'center'}}>{profile.fullName}</Title>
            {(myId !== profile.userId) && (status !== undefined) ?  <Text style={{margin: '0 auto'}}>{status}</Text> : <StatusWithHooks status={status} updateStatus={updateStatus} />}
            <div className={s.avaWrapper}>
                <Avatar size={300} icon={<UserOutlined />} src={profile.photos.large}></Avatar>
                {myId === profile.userId && <div className={s.changeAva}>
                    <input className={s.changeAvaInput} type="file" onChange={avaNewSelected} />
                </div>}
            </div>
            {myId === profile.userId && <ProfileEditorDrawer />}
            {myId !== profile.userId && <button className={s.friendsBtn}>Добавить в друзья</button>}
        </div>
    );
}

export default ProfileLeft;