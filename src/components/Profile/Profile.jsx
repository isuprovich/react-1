import React from 'react'
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileLeft from './ProfileLeft/ProfileLeft';
import ProfileEditor from './ProfileEditor/ProfileEditor';
import Preloader from '../common/preloader/preloader';

const Profile = (props) => {
    const onSubmit = (formData) => {
        props.updateProfileInfoThunk(formData)
        props.profileEditToggle()
    }
    if (props.profile != null) return (
        <div className={s.profile}>
            {props.profileEditMode && <ProfileEditor profile={props.profile} onSubmit={onSubmit} />}
            <ProfileLeft
                profile={props.profile}
                myId={props.myId}
                status={props.status}
                updateStatus={props.updateStatus}
                saveAva={props.saveAva}
            />
            <ProfileInfo
                profile={props.profile}
                myId={props.myId}
                profileEditToggle={props.profileEditToggle}
            />
            <MyPostsContainer className={s.posts} />
        </div>
    );
    return <Preloader />
}

export default Profile;