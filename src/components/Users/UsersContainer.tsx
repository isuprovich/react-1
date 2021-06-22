import { connect } from 'react-redux';
import { requestUsers, follow, unfollow, FilterType } from '../../redux/usersReducer';
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getFollowingInProgress, getUsersSearchFilter } from '../../redux/usersSelectors';
import React from 'react';
import Users from './Users';
import UsersPagination from './UsersPagination';
import { UsersType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';
import { UsersSearchForm } from './UsersSearchForm';

type MSTPType = {
  filter: FilterType,
  currentPage: number,
  pageSize: number,
  totalUsersCount: number,
  users: Array<UsersType>,
  followingInProgress: Array<number>,
  myId: number | null
}
type MDTPType = {
  requestUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void,
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
}

type PropsType = MSTPType & MDTPType

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props
    this.props.requestUsers(currentPage, pageSize, filter)
  }
  onPageChange = (pageNumber: number) => {
    const { pageSize, filter } = this.props
    this.props.requestUsers(pageNumber, pageSize, filter)
  }
  onFilterChange = (filter: FilterType) => {
    const { pageSize } = this.props
    this.props.requestUsers(1, pageSize, filter)
  }
  render() {
    return <>
      <UsersPagination
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChange={this.onPageChange} />
      <UsersSearchForm
        onFilterChange={this.onFilterChange} />
      <Users
        myId={this.props.myId}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress} />
    </>
  }
}

let mapStateToProps = (state: AppStateType): MSTPType => {
  return {
    filter: getUsersSearchFilter(state),
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    followingInProgress: getFollowingInProgress(state),
    myId: state.auth.id
  }
}

export default connect<MSTPType, MDTPType, {}, AppStateType>(mapStateToProps, { follow, unfollow, requestUsers })(UsersContainer)