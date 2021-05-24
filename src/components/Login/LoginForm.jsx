import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import s from './LoginForm.module.css';
import { required } from '../../utils/validators/validators'

const LoginForm = (props) => {
    return <form className={s.loginform} onSubmit={props.handleSubmit}>
        <div>
            <Field
                name={'email'}
                component={Input}
                placeholder={"Ваш E-mail"}
                validate={[required]}
            />
        </div>
        <div>
            <Field
                name={'password'}
                type={'password'}
                component={Input}
                placeholder={"Пароль"}
                validate={[required]}
            />
        </div>
        <div className={s.rememberMe}>
            <Field
                name={'rememberMe'}
                component={Input}
                type={"checkbox"}
                className={s.checkbox}
            /><div className={s.rememberMeText}>Запомнить меня?</div>
        </div>
        {props.needCaptcha && <div>
            <div>
                <img src={props.captchaUrl} alt="CAPTCHA" />
            </div>
            <div>
                <Field
                    name={'captcha'}
                    type={'captcha'}
                    component={Input}
                    placeholder={"Введите код с картинки"}
                />
            </div>
        </div>}
        {props.error && <div className={s.commonError}>
            {props.error}
        </div>}
        <div>
            <button className={s.loginBtn}>Войти</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default LoginReduxForm