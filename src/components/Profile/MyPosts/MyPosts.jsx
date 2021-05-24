import React from 'react'
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const MyPosts = React.memo(props => {
    console.log('Render MyPosts')
    let postsList = props.posts
        .map(p => <Post key={p.id} id={p.id} user={p.user} message={p.message} />);

    let addNewPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsWrapper}>
            <AddPostFormRedux onSubmit={addNewPost} />
            {postsList}
        </div>
    );
})

const maxLength200 = maxLengthCreator(200);

const AddPostForm = (props) => {
    return (
        <form className={s.newPostForm} onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name={'newPostText'}
                validate={[required, maxLength200]}
                placeholder={'Введите текст вашего поста...'} />
            <button>Опубликовать</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm({ form: 'profileAddPostFormForm' })(AddPostForm)

export default MyPosts;