import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Input } from '../common/FormsControls/FormsControls';
import s from './LoginForm.module.css';
import { required } from '../../utils/validators/validators'

type LoginFormTypes = {
    isNeedCaptcha: boolean,
    captchaUrl: string | undefined
}

export type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: boolean
}

type LoginFormValuesTypeKeys = Extract<keyof FormDataType, string>

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormTypes> & LoginFormTypes> = ({ handleSubmit, error, isNeedCaptcha, captchaUrl }) => {
    return <form className={s.loginform} onSubmit={handleSubmit}>
        {createField<LoginFormValuesTypeKeys>('email', 'email', 'Ваш E-mail', [required], Input, undefined, undefined)}
        {createField<LoginFormValuesTypeKeys>('password', 'password', 'Пароль', [required], Input, undefined, undefined)}
        <div className={s.checkboxWrapper}>
            {createField<LoginFormValuesTypeKeys>('rememberMe', 'checkbox', undefined, [], Input, s.checkbox, undefined)}
            <span className={s.checkboxName}>Запомнить меня?</span>
        </div>
        {isNeedCaptcha && <div>
            <div>
                <img src={captchaUrl} alt="CAPTCHA" />
            </div>
            {createField<LoginFormValuesTypeKeys>('captcha', 'captcha', 'Введите код с картинки', [required], Input, undefined, undefined)}
        </div>}
        {error && <div className={s.commonError}>{error}</div>}
        <div><button className={s.loginBtn}>Войти</button></div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormTypes>({ form: 'login' })(LoginForm)

export default LoginReduxForm