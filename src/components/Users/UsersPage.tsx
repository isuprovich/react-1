import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyId } from '../../redux/authSelectors'
import { FilterType, follow, requestUsers, unfollow } from '../../redux/usersReducer'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersSearchFilter } from '../../redux/usersSelectors'
import { UsersSearchForm } from './UsersSearchForm'
import UsersPagination from './UsersPagination'
import User from './User'
import s from './Users.module.css'
import { useHistory } from 'react-router'
import * as queryString from 'querystring'
import { Row, Col, Space } from 'antd';


type QueryParamsType = { term?: string, page?: string, friend?: string }

const UsersPage = () => {
    const onPageChange = (pageNumber: number, pageSize?: number | undefined) => {
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
    const history = useHistory()

    useEffect(() => {
        const parsedSearch = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter
        if (parsedSearch.page) actualPage = Number(parsedSearch.page)
        if (parsedSearch.term) actualFilter = { ...actualFilter, term: parsedSearch.term as string }
        switch (parsedSearch.friend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null }
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true }
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false }
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        history.push(
            {
                pathname: "/users",
                search: queryString.stringify(query)
            }
        )
    }, [filter, currentPage])

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
        <div style={{height: '24px'}}></div>
        <Row gutter={[8, 8]} justify={'center'} >
            {users.map(u =>
                <Col>
                    <User
                        key={u.id}
                        user={u}
                        followingInProgress={followingInProgress}
                        myId={myId}
                        followUser={followUser}
                        unfollowUser={unfollowUser}
                    />
                </Col>

            )}
        </Row>
        <div className={s.wrapper}>

        </div>
    </div>
}

export default UsersPage;