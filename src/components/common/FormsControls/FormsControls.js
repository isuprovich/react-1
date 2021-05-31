import s from './FormsControls.module.css';
import { Field } from 'redux-form';

const FormControl = ({ input, meta: {touched, error}, children, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + s.error}>
            <div className={s.absoluteNote}>
                {hasError && <span>{error}</span>}
            </div>
            {children}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><textarea  {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><input  {...input} {...restProps} /></FormControl>
}

export const createField = (name, type, placeholder, validator, component, style, key) => (
    <div className={style}>
        <Field
            key={key}
            name={name}
            type={type}
            placeholder={placeholder}
            validate={validator}
            component={component}
        />
    </div>
)