import React from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus } from '../../redux/profileReducer'
import { Redirect, withRouter } from 'react-router';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userid = this.props.match.params.userid;
        if (!userid) {
            userid = this.props.myId;
        }
        this.props.getProfile(userid);
        this.props.getStatus(userid);
    }
    render() {
        if (!this.props.isAuth) return <Redirect to={"/login"} />
        return <>
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        </>
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { getProfile, getStatus, updateStatus }),
    withRouter
)(ProfileContainer)