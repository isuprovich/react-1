import React from 'react';
import s from './ProfileEditor.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Input } from '../../common/FormsControls/FormsControls';
import { ProfileType } from '../../../types/types';

type ProfileEditorFormTypes = {
    profile: ProfileType
}

export type ProfileEditorFormDataType = {
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string
}

type ProfileEditorFormValuesTypeKeys = Extract<keyof ProfileEditorFormDataType, string>

const ProfileEditorForm: React.FC<InjectedFormProps<ProfileType, ProfileEditorFormTypes> & ProfileEditorFormTypes> = ({ handleSubmit, error, profile }) => {
    return (
        <form onSubmit={handleSubmit}>
            <h2>Редактирование профиля</h2>
            {error && <div className={s.commonError}>{error}</div>}
            <div className={s.wrapper}>
                <div>Полное имя:</div>
                {createField<ProfileEditorFormValuesTypeKeys>("fullName", "text", "Полное имя", undefined, Input, undefined, undefined)}
                <div>Ищу работу:</div>
                {createField<ProfileEditorFormValuesTypeKeys>("lookingForAJob", "checkbox", "lookingForAJob", undefined, Input, undefined, undefined)}
                <div>Описание:</div>
                {createField<ProfileEditorFormValuesTypeKeys>("lookingForAJobDescription", "text", "Описание поиска работы", undefined, Input, undefined, undefined)}
                <div>Обо мне:</div>
                {createField<ProfileEditorFormValuesTypeKeys>("aboutMe", "text", "Обо мне", undefined, Input, undefined, undefined)}
            </div>
            {Object.keys(profile.contacts).map(key => {
                return <div key={key}>
                    <div>{key}:</div>
                    {createField("contacts." + key, "text", key, undefined, Input, undefined, undefined)}
                </div>
            })}
            <button className={s.updInfoBtn}>Сохранить изменения</button>
        </form>
    )
}

const ProfileEditorReduxForm = reduxForm<ProfileType, ProfileEditorFormTypes>({ form: 'profile-edit' })(ProfileEditorForm)

export default ProfileEditorReduxForm