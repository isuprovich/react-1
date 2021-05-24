import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer'
import Header from './Header';

class HeaderContainer extends React.Component {
    render() {
        return <>
            <Header {...this.props} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        myId: state.auth.id,
        myLogin: state.auth.login,
        myEmail: state.auth.email
    };
}

export default connect(mapStateToProps, { logout })(HeaderContainer)