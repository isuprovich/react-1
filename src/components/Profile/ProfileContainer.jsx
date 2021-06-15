import React from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import profileEditTogggle, { getProfile, getStatus, updateStatus, saveAva, updateProfileInfoThunk } from '../../redux/profileReducer'
import { Redirect, withRouter } from 'react-router';
import { compose } from 'redux';
import Preloader from '../common/preloader/preloader';

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userid = this.props.match.params.userid;
        if (!userid) {
            userid = this.props.myId;
            if (!userid) {
                this.props.history.push("/login")
            }
        }
        this.props.getProfile(userid);
        this.props.getStatus(userid);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userid !== prevProps.match.params.userid) {
            this.refreshProfile()
        }
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={"/login"} />
        return <>
            {this.props.isFetching && <Preloader />}
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                saveAva={this.props.saveAva}
                myId={this.props.myId}
                profileEditToggle={this.props.profileEditToggle}
                updateProfileInfoThunk={this.props.updateProfileInfoThunk}
            />
        </>
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myId: state.auth.id,
    isAuth: state.auth.isAuth,
    isFetching: state.fetchAnim.isFetching,
    profileEditMode: state.profilePage.profileEditMode
})

export default compose(
    connect(mapStateToProps, { getProfile, getStatus, updateStatus, saveAva, profileEditTogggle, updateProfileInfoThunk }),
    withRouter
)(ProfileContainer)