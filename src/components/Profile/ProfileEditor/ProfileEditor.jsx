import React from 'react'
import s from './ProfileEditor.module.css';
import ProfileEditorReduxForm from './ProfileEditorForm';

const ProfileEditor = (props) => {
    return <div
        className={s.editorWrapper}
    >
        <ProfileEditorReduxForm profile={props.profile} />
    </div>
}

export default ProfileEditor;