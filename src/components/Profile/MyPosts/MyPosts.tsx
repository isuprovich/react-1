import React from 'react'
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { createField, Textarea } from '../../common/FormsControls/FormsControls';
import { PostsType } from '../../../types/types';

type MyPostsTypes = {
    posts: Array<PostsType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MyPostsTypes> = props => {
    let postsList = props.posts
        .map(p => <Post key={p.id} id={p.id} user={p.user} message={p.message} />);

    let addNewPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }
    return (
        <div className={s.postsWrapper}>
            <AddPostFormRedux onSubmit={addNewPost} />
            {postsList}
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts)

const maxLength200 = maxLengthCreator(200);

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = Extract<keyof AddPostFormValuesType, string>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType>> = ({ handleSubmit }) => {
    return (
        <form className={s.newPostForm} onSubmit={handleSubmit}>
            {createField<AddPostFormValuesTypeKeys>('newPostText', 'text', 'Введите текст вашего поста...', [required, maxLength200], Textarea, undefined, undefined)}
            <button>Опубликовать</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm<AddPostFormValuesType>({ form: 'profileAddPostFormForm' })(AddPostForm)

export default MyPostsMemorized;