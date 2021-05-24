import { connect } from "react-redux";
import { login, getCaptcha } from "../../redux/authReducer";
import Login from "./Login";
import React from 'react';

class LoginContainer extends React.Component {

    componentDidUpdate(needCaptcha) {
        if (needCaptcha) {
            getCaptcha();
            console.log('Request captcha')
        }
    }

    render() {
        return <Login
            login={this.props.login}
            getCaptcha={this.props.getCaptcha}
            isAuth={this.props.isAuth}
            captchaUrl={this.props.captchaUrl}
            needCaptcha={this.props.needCaptcha}
        />
    }
}

let mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
        needCaptcha: state.auth.needCaptcha
})

export default connect(mapStateToProps, { login, getCaptcha })(LoginContainer)