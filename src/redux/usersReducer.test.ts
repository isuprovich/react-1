import usersReducer, { InitialStateType, usersActions } from "./usersReducer"
let state: InitialStateType
beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Ivan', status: 'shit', photos: {small: null, large: null}, followed: false},
            {id: 1, name: 'Alex', status: 'like', photos: {small: null, large: null}, followed: false},
            {id: 2, name: 'Irvin', status: 'hi', photos: {small: null, large: null}, followed: true},
            {id: 3, name: 'Harold', status: 'oops', photos: {small: null, large: null}, followed: true}
        ],
        pageSize: 13,
        totalUsersCount: 0,
        currentPage: 1,
        followingInProgress: []
    }
})

test("follow success", () => {
    const newState = usersReducer(state, usersActions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test("unfollow success", () => {
    const newState = usersReducer(state, usersActions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})