import { Form, Input, Button, Checkbox, Image } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { useDispatch, useSelector } from 'react-redux';
import { getCaptchaUrl, getIsAuth, getIsNeedCaptcha } from '../../redux/authSelectors';
import { useEffect } from 'react';
import { getCaptcha, login } from '../../redux/authReducer';
import { Redirect } from 'react-router';

const LoginForm = () => {
    const onFinish = (values: any) => {
        console.log(values.email, values.password, values.rememberMe, values.captcha)
        dispatch(login(values.email, values.password, values.rememberMe, values.captcha))
    }
    const captchaUrl = useSelector(getCaptchaUrl)
    const isNeedCaptcha = useSelector(getIsNeedCaptcha)
    const isAuth = useSelector(getIsAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isNeedCaptcha) {
            dispatch(getCaptcha())
        }
    }, [])
    if (isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <>
        <Form
            name="loginForm"
            className="login-form"
            initialValues={{ rememberMe: true }}
            onFinish={onFinish}
        >
            <Title style={{ textAlign: 'center' }}>Вход</Title>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Пожалуйста, введите ваш E-Mail!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-Mail" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="https://social-network.samuraijs.com/login">
                    Забыли пароль
                </a>
            </Form.Item>
            {isNeedCaptcha && <Form.Item>
                <Form.Item>
                    <img src={captchaUrl} style={{ width: '200px', height: '100px', display: 'flex', margin: '0 auto' }}></img>
                </Form.Item>
                <Form.Item
                    name="captcha"
                >
                    <Input placeholder="Введите текст с картинки" />
                </Form.Item>
            </Form.Item>}
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Войти
                </Button>
                Или <a href="https://social-network.samuraijs.com/signUp">зарегистрироваться сейчас!</a>
            </Form.Item>
        </Form>
    </>
}

export default LoginForm