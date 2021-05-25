import profileReducer, { addPost } from "./profileReducer";

it('new post length should be ++', () => {
    //1. test data
    let action = addPost('test post text');
    let state = {
        posts: [
            { id: 1, user: 'Admin', message: '1' }
        ]
    };
    //2. action
    let newState = profileReducer(state, action);
    //3. expect
    expect (newState.posts[0].message).toBe('test post text');
})