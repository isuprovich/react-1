import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FilterType } from '../../redux/usersReducer';

type UsersSearchFormTypes = {
    onFilterChange: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<UsersSearchFormTypes> = ({ onFilterChange }) => {
    const submit = (values: FilterType, { setSubmitting }: { setSubmitting: (setSubmitting: boolean) => void }) => {
        onFilterChange(values)
        setSubmitting(false)
    }
    return <div>
        <Formik
            initialValues={{ term: '' }}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <button type="submit" disabled={isSubmitting}>Найти</button>
                </Form>
            )}
        </Formik>
    </div>;
};
