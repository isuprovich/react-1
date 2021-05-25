import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input } from '../common/FormsControls/FormsControls';
import s from './LoginForm.module.css';
import { required } from '../../utils/validators/validators'

const LoginForm = ({ handleSubmit, error, needCaptcha, captchaUrl }) => {
    return <form className={s.loginform} onSubmit={handleSubmit}>
        {createField('email', 'email', 'Ваш E-mail', [required], Input)}
        {createField('password', 'password', 'Пароль', [required], Input)}
        {createField('rememberMe', 'checkbox', [], [], Input, s.rememberMe, <div className={s.rememberMeText}>Запомнить меня?</div>)}
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