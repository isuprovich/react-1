import React from 'react';
import LoginReduxForm, { FormDataType } from './LoginForm';
import s from './Login.module.css';
import { Redirect } from 'react-router';

type PropsType = {
    needCaptcha: boolean,
    captchaUrl: string | undefined,
    isAuth: boolean,
    login: (email: string, password: string, rememberMe: boolean, captcha: boolean) => void
}


const Login: React.FC<PropsType> = ({needCaptcha, captchaUrl, isAuth, login}) => {
    const onSubmit = (formData: FormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div className={s.login}>
        <h1>ВХОД</h1>
        <LoginReduxForm needCaptcha={needCaptcha} captchaUrl={captchaUrl} onSubmit={onSubmit} />
    </div>
}

export default Login