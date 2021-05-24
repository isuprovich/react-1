import React from 'react'
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Preloader from '../common/preloader/preloader';

const Profile = (props) => {
    if (props.profile != null) return (
        <div className={s.profile}>
            <ProfileInfo
                profile={props.profile} 
                status={props.status }
                updateStatus={props.updateStatus}
            />
            <MyPostsContainer className={s.posts} />
        </div>
    );
    return <Preloader />
}

export default Profile;