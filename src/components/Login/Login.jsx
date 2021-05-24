import React from 'react';
import LoginReduxForm from './LoginForm';
import s from './Login.module.css';
import { Redirect } from 'react-router';

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div className={s.login}>
        <h1>ВХОД</h1>
        <LoginReduxForm needCaptcha={props.needCaptcha} captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
    </div>
}

export default Login