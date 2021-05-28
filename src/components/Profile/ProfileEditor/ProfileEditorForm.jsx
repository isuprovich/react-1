import React from 'react';
import s from './ProfileEditor.module.css'
import { reduxForm } from 'redux-form';
import { createField, Input } from '../../common/FormsControls/FormsControls';

const ProfileEditorForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <h2>Редактирование профиля</h2>
        <div className={s.wrapper}>
            <div classname={s.gridDesc}>Полное имя:</div>
            {createField("fullName", "text", "Полное имя", [], Input)}
            <div>Ищу работу:</div>
            {createField("lookingForAJob", "checkbox", "lookingForAJob", [], Input, [], <div>Ищу работу</div>)}
            <div>Описание:</div>
            {createField("lookingForAJobDescription", "text", "Описание поиска работы", [], Input)}
            <div>Обо мне:</div>
            {createField("aboutMe", "text", "Обо мне", [], Input)}
            <div>ВК:</div>
            {createField("contacts.vk", "text", "ВК", [], Input)}
            <div>Instagram:</div>
            {createField("contacts.instagram", "text", "Instagram", [], Input)}
            <div>Github:</div>
            {createField("contacts.github", "text", "Github", [], Input)}
            <div>Facebook:</div>
            {createField("contacts.facebook", "text", "Facebook", [], Input)}
            <div>Twitter:</div>
            {createField("contacts.twitter", "text", "Twitter", [], Input)}
            <div>Сайт:</div>
            {createField("contacts.website", "text", "Сайт", [], Input)}
            <div>Youtube:</div>
            {createField("contacts.youtube", "text", "Youtube", [], Input)}
            <div>Ссылка:</div>
            {createField("contacts.mainLink", "text", "Главная ссылка", [], Input)}
        </div>
        <button className={s.updInfoBtn}>Сохранить изменения</button>
    </form>
}

const ProfileEditorReduxForm = reduxForm({ form: 'profile-edit' })(ProfileEditorForm)

export default ProfileEditorReduxForm