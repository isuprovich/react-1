import React from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { profileActions, getProfile, getStatus, updateStatus, saveAva, updateProfileInfoThunk } from '../../redux/profileReducer'
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';
import { PostsType, ProfileType } from '../../types/types';

type MSTPType = {
    profile: ProfileType | null,
    status: string,
    myId: number | null,
    isAuth: boolean,
    isFetching: boolean,
    profileEditMode: boolean,
    posts: Array<PostsType>
}
type MDTPType = {
    getProfile: (userId: number | null) => void,
    getStatus: (userId: number | null) => void,
    updateStatus: () => void,
    saveAva: () => void,
    profileEditToggle: () => void,
    addPost: () => void
}
type PathParamsType = {
    userId: string
}
type PropsType = MSTPType & MDTPType & RouteComponentProps<PathParamsType>
class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.myId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={"/login"} />
        return <>
            <Profile
                {...this.props}
                profile={this.props.profile}
                posts={this.props.posts}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                saveAva={this.props.saveAva}
                myId={this.props.myId}
                profileEditToggle={this.props.profileEditToggle}
                addPost={this.props.addPost}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MSTPType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myId: state.auth.id,
    isAuth: state.auth.isAuth,
    isFetching: state.fetchAnim.isFetching,
    profileEditMode: state.profilePage.profileEditMode,
    posts: state.profilePage.posts
})

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {
            getProfile,
            getStatus,
            updateStatus,
            saveAva,
            profileEditToggle: profileActions.profileEditToggle,
            updateProfileInfoThunk,
            addPost: profileActions.addPost
        }
    ),
    withRouter
)(ProfileContainer)