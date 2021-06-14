import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer'
import { AppStateType } from '../../redux/reduxStore';
import Header from './Header';

type MSTPType = {
    isAuth: boolean,
    myId: number | null,
    myLogin: string | null
}

type MDTPType = {
    logout: () => void
}

type PropsType = MSTPType & MDTPType

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <>
            <Header
                isAuth={this.props.isAuth}
                myId={this.props.myId}
                myLogin={this.props.myLogin}
                logout={this.props.logout} />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MSTPType => {
    return {
        isAuth: state.auth.isAuth,
        myId: state.auth.id,
        myLogin: state.auth.login
    };
}

export default connect(mapStateToProps, { logout })(HeaderContainer)