import LoginReduxForm, { FormDataType } from './LoginForm';
import s from './Login.module.css';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCaptchaUrl, getIsAuth, getIsNeedCaptcha } from '../../redux/authSelectors';
import { getCaptcha, login } from '../../redux/authReducer';
import { useEffect } from 'react';

const LoginPage = () => {
    const captchaUrl = useSelector(getCaptchaUrl)
    const isAuth = useSelector(getIsAuth)
    const isNeedCaptcha = useSelector(getIsNeedCaptcha)
    const dispatch = useDispatch()
    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    useEffect(() => {
        if (isNeedCaptcha) {
            dispatch(getCaptcha())
        }
    }, [])

    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div className={s.login}>
        <h1>ВХОД</h1>
        <LoginReduxForm isNeedCaptcha={isNeedCaptcha} captchaUrl={captchaUrl} onSubmit={onSubmit} />
    </div>
}

export default LoginPage