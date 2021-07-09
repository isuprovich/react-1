import React from 'react'
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileLeft from './ProfileLeft/ProfileLeft';
import LoadProgress from '../common/LoadProgress/loadProgress';
import { PostsType, ProfileType } from '../../types/types';
import MyPostsMemorized from './MyPosts/MyPosts';
import ProfileEditorForm from '../Profile/ProfileEditor/ProfileEditorForm';
import ProfileEditorDrawer from './ProfileEditor/ProfileEditorDrawer';

type PropsType = {
    updateProfileInfoThunk: (profile: ProfileType) => void,
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

const Profile: React.FC<PropsType> = ({ updateProfileInfoThunk, updateStatus, saveAva, profileEditToggle, profile, status, myId, profileEditMode, posts, addPost }) => {
    const onSubmit = (formData: ProfileType) => {
        updateProfileInfoThunk(formData)
    }
    if (profile != null) return (
        <div className={s.profile}>
            {profileEditMode && <div className={s.editorWrapper}>
                <ProfileEditorForm
                    profile={profile}
                    initialValues={profile}
                    onSubmit={onSubmit}
                />
            </div>}
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
            <ProfileEditorDrawer />
        </div>
    );
    return <LoadProgress />
}

export default Profile;