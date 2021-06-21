import React from 'react';
import s from './AddMessageForm.module.css';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Textarea } from '../../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../../utils/validators/validators';

type AddMessageFormDataType = { newMessageText: string }
type AddMessageFormValuesTypeKeys = Extract<keyof AddMessageFormDataType, string>

const maxLength200 = maxLengthCreator(200);

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={s.newMessageForm}>
            {createField<AddMessageFormValuesTypeKeys>('newMessageText', '', 'Enter your message', [required, maxLength200], Textarea, undefined, undefined)}
            <button>
                Отправить
            </button>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<AddMessageFormDataType>({ form: 'dialogAddMessageForm' })(AddMessageForm)