import React from 'react';
import s from './AddMessageForm.module.css';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../../utils/validators/validators';

const maxLength200 = maxLengthCreator(200);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.newMessageForm}>
            <Field
                component={Textarea}
                validate={[required, maxLength200]}
                name={'newMessageText'}
                placeholder={'Enter your message'} />
            <button>
                Отправить
            </button>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)