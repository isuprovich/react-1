import { connect } from 'react-redux';
import { requestUsers, follow, unfollow } from '../../redux/usersReducer';
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getFollowingInProgress } from '../../redux/usersSelectors';
import React from 'react';
import Users from './Users';
import UsersPagination from './UsersPagination';
import { UsersType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MSTPType = {
    currentPage: number,
    pageSize: number,
    totalUsersCount: number,
    users: Array<UsersType>,
    followingInProgress: Array<number>
}
type MDTPType = {
    requestUsers: (pageNumber: number, pageSize: number) => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
}

type PropsType = MSTPType & MDTPType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChange = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }
    render() {
        return <>
            <UsersPagination
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange} />
            <Users
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress} />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MSTPType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect<MSTPType, MDTPType, {}, AppStateType>(mapStateToProps, { follow, unfollow, requestUsers })(UsersContainer)