import React from 'react'
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileLeft from './ProfileLeft/ProfileLeft';
import Preloader from '../common/preloader/preloader';

const Profile = (props) => {
    if (props.profile != null) return (
        <div className={s.profile}>
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
            />
            <MyPostsContainer className={s.posts} />
        </div>
    );
    return <Preloader />
}

export default Profile;