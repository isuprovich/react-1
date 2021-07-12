import React from 'react'
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileLeft from './ProfileLeft/ProfileLeft';
import LoadProgress from '../common/LoadProgress/loadProgress';
import { PostsType, ProfileType } from '../../types/types';
import MyPostsMemorized from './MyPosts/MyPosts';

type PropsType = {
    updateStatus: () => void,
    saveAva: (file: File) => void,
    profileEditToggle: () => void,
    profile: ProfileType | null,
    status: string,
    myId: number | null,
    profileEditMode: boolean,
    posts: Array<PostsType>,
    addPost: () => void
}

const Profile: React.FC<PropsType> = ({ updateStatus, saveAva, profileEditToggle, profile, status, myId, posts, addPost }) => {
    if (profile != null) return (
        <div className={s.profile}>
            <ProfileLeft
                profile={profile}
                myId={myId}
                status={status}
                updateStatus={updateStatus}
                saveAva={saveAva}
            />
            <ProfileInfo
                profile={profile}
                myId={myId}
                profileEditToggle={profileEditToggle}
            />
            <MyPostsMemorized posts={posts} addPost={addPost} />
        </div>
    );
    return <LoadProgress />
}

export default Profile;