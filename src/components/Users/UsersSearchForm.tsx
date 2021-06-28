import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FilterType } from '../../redux/usersReducer';
import { useSelector } from 'react-redux';
import { getUsersSearchFilter } from '../../redux/usersSelectors';

type FriendFormType = "true" | "false" | "null"
type FormType = {
    term: string,
    friend: FriendFormType
}
type UsersSearchFormType = { onFilterChange: (filter: FilterType) => void }

export const UsersSearchForm: React.FC<UsersSearchFormType> = React.memo(({ onFilterChange }) => {
    const filter = useSelector(getUsersSearchFilter)
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
            enableReinitialize={true}
            initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
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
