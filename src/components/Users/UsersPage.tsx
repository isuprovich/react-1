import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyId } from '../../redux/authSelectors';
import { FilterType, follow, requestUsers, unfollow } from '../../redux/usersReducer';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersSearchFilter } from '../../redux/usersSelectors';
import { UsersSearchForm } from './UsersSearchForm';
import UsersPagination from './UsersPagination';
import User from './User';
import s from './Users.module.css';

const UsersPage = () => {
    const onPageChange = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChange = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getUsersSearchFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const myId = useSelector(getMyId)
    const dispatch = useDispatch()
    const followUser = (userId: number) => { dispatch(follow(userId)) }
    const unfollowUser = (userId: number) => { dispatch(unfollow(userId)) }
    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    return <div>
        <UsersPagination
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
        />
        <UsersSearchForm
            onFilterChange={onFilterChange}
        />
        <div className={s.wrapper}>
            {users.map(u =>
                <User
                    key={u.id}
                    user={u}
                    followingInProgress={followingInProgress}
                    myId={myId}
                    followUser={followUser}
                    unfollowUser={unfollowUser}                
                />
            )}
        </div>
    </div>
}

export default UsersPage;