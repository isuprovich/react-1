import React, {useState, useEffect} from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input } from '../../common/FormsControls/FormsControls';

const ProfileEditorForm = (props) => {

    let [profile, setProfileInfo] = useState(props.profile)

    useEffect(() => {
        setProfileInfo(props.profile);
    }, [props.profile]);

    // const onProfileChange = (e) => {
    //     setProfileInfo(e.currentTarget.value)
    // }

    return <form>
        Редактирование профиля:
        Ищу работу: {profile.lookingForAJob ? "да" : "нет"}
        {createField("lookingForAJob", "checkbox", "lookingForAJob", [], Input)}
        {createField("aboutMe", "text", "Обо мне", [], Input)}
        {createField("VK", "text", "ВК", [], Input)}
        {createField("Instagram", "text", "Instagram", [], Input)}
        {createField("Github", "text", "Github", [], Input)}
        {createField("Facebook", "text", "Facebook", [], Input)}
        {createField("twitter", "text", "twitter", [], Input)}
        {createField("website", "text", "website", [], Input)}
        {createField("youtube", "text", "youtube", [], Input)}
        {createField("mainLink", "text", "mainLink", [], Input)}
        <button>Сохранить изменения</button>
    </form>
}

const ProfileEditorReduxForm = reduxForm({ form: 'profile-edit' })(ProfileEditorForm)

export default ProfileEditorReduxForm