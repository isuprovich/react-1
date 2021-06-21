import { follow } from "./usersReducer"

test("", async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()
    //@ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
})