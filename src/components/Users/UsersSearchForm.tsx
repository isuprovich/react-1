import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FilterType } from '../../redux/usersReducer';

type FormType = {
    term: string,
    friend: "true" | "false" | "null"
}
type UsersSearchFormType = { onFilterChange: (filter: FilterType) => void }

export const UsersSearchForm: React.FC<UsersSearchFormType> = React.memo(({ onFilterChange }) => {
    
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (setSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        onFilterChange(filter)
        setSubmitting(false)
    }
    return <div>
        <Formik
            initialValues={{ term: '', friend: "null" }}
            onSubmit={submit}>
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">Все</option>
                        <option value="true">Только друзья</option>
                        <option value="false">Кроме друзей</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>Найти</button>
                </Form>
            )}
        </Formik>
    </div>
})
