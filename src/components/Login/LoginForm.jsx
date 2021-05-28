import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input } from '../common/FormsControls/FormsControls';
import s from './LoginForm.module.css';
import { required } from '../../utils/validators/validators'

const LoginForm = ({ handleSubmit, error, needCaptcha, captchaUrl }) => {
    return <form className={s.loginform} onSubmit={handleSubmit}>
        {createField('email', 'email', 'Ваш E-mail', [required], Input)}
        {createField('password', 'password', 'Пароль', [required], Input)}
        <div className={s.checkboxWrapper}>
            {createField('rememberMe', 'checkbox', [], [], Input, s.checkbox)}
            <span className={s.checkboxName}>Запомнить меня?</span>
        </div>
        {needCaptcha && <div>
            <div>
                <img src={captchaUrl} alt="CAPTCHA" />
            </div>
            {createField('captcha', 'captcha', 'Введите код с картинки', [required], Input)}
        </div>}
        {error && <div className={s.commonError}>{error}</div>}
        <div><button className={s.loginBtn}>Войти</button></div>
    </form>
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default LoginReduxForm