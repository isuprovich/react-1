import { connect } from 'react-redux';
import { requestUsers, follow, setCurrentPage, unfollow } from '../../redux/usersReducer';
import React from 'react';
import Users from './Users';
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getFollowingInProgress } from '../../redux/usersSelectors';

class UsersContainer extends React.Component {
    componentDidMount() {
        console.log('Mount UsersContainer')
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChange = (pageNumber) => {
        console.log('pageChange UsersContainer')
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }
    render() {
        console.log('Render Users')
        return <>
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                onPageChange={this.onPageChange}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    console.log('MSTP Users')
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect(mapStateToProps, { follow, unfollow, setCurrentPage, requestUsers })(UsersContainer)