import { connect } from "react-redux";
import { login, getCaptcha } from "../../redux/authReducer";
import Login from "./Login";
import React from 'react';
import { AppStateType } from "../../redux/reduxStore";

type MSTPType = {
    isAuth: boolean,
    captchaUrl: string | undefined,
    needCaptcha: boolean
}

type MDTPType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: boolean) => void
    getCaptcha: () => void
}

type PropsType = MSTPType & MDTPType

class LoginContainer extends React.Component<PropsType> {

    componentDidUpdate(needCaptcha: any) {
        if (needCaptcha) {
            getCaptcha();
        }
    }

    render() {
        return <Login
            login={this.props.login}
            //@ts-ignore
            getCaptcha={this.props.getCaptcha}
            isAuth={this.props.isAuth}
            captchaUrl={this.props.captchaUrl}
            needCaptcha={this.props.needCaptcha}
        />
    }
}

const mapStateToProps = (state: AppStateType) => ({
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
        needCaptcha: state.auth.needCaptcha
})

export default connect(mapStateToProps, { login, getCaptcha })(LoginContainer)