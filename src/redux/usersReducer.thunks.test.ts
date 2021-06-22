import { ResponseType, ResultCodeEnum } from "../API/api"
import { usersAPI } from "../API/usersAPI"
import { follow, usersActions } from "./usersReducer"
jest.mock("../API/usersAPI")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseType = {
    data: {},
    messages: [],
    resultCode: 0
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

test("follow check", async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress(false, 1))
})