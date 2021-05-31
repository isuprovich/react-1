import React from 'react';
import s from './ProfileEditor.module.css'
import { reduxForm } from 'redux-form';
import { createField, Input } from '../../common/FormsControls/FormsControls';

const ProfileEditorForm = ({ handleSubmit, error, profile }) => {
    return <form onSubmit={handleSubmit}>
        <h2>Редактирование профиля</h2>
        {error && <div className={s.commonError}>{error}</div>}
        <div className={s.wrapper}>
            <div>Полное имя:</div>
            {createField("fullName", "text", "Полное имя", [], Input)}
            <div>Ищу работу:</div>
            {createField("lookingForAJob", "checkbox", "lookingForAJob", [], Input, [], <div>Ищу работу</div>)}
            <div>Описание:</div>
            {createField("lookingForAJobDescription", "text", "Описание поиска работы", [], Input)}
            <div>Обо мне:</div>
            {createField("aboutMe", "text", "Обо мне", [], Input)}
        </div>
        {Object.keys(profile.contacts).map(key => {
            return <div key={key}>
                <div>{key}:</div>
                {createField("contacts." + key, "text", key, [], Input)}
            </div>
        })}
        <button className={s.updInfoBtn}>Сохранить изменения</button>
    </form>
}

const ProfileEditorReduxForm = reduxForm({ form: 'profile-edit' })(ProfileEditorForm)

export default ProfileEditorReduxForm