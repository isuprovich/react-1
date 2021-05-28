import React from 'react'
import s from './ProfileEditor.module.css';
import ProfileEditorReduxForm from './ProfileEditorForm';

const ProfileEditor = ({profile, onSubmit}) => {
    return <div className={s.editorWrapper}>
        <ProfileEditorReduxForm profile={profile} onSubmit={onSubmit} initialValues={profile} />
    </div>
}

export default ProfileEditor;