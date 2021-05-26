import { connect } from 'react-redux';
import { requestUsers, follow, setCurrentPage, unfollow } from '../../redux/usersReducer';
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getFollowingInProgress } from '../../redux/usersSelectors';
import React from 'react';
import Users from './Users';
import UsersPagination from './UsersPagination';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChange = (pageNumber) => {
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

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect(mapStateToProps, { follow, unfollow, setCurrentPage, requestUsers })(UsersContainer)