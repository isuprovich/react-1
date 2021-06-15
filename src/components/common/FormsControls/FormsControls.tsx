import s from './FormsControls.module.css';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validators/validators';

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
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

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props;
    return <FormControl {...props}><textarea  {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props;
    return <FormControl {...props}><input  {...input} {...restProps} /></FormControl>
}

export function createField<FormKeysType extends string> (name: FormKeysType,
                            type: string,
                            placeholder: string | undefined,
                            validator: Array<FieldValidatorType> | undefined,
                            component: React.FC<WrappedFieldProps>,
                            style: string | undefined,
                            key: string | undefined) {
    return <div className={style}>
        <Field key={key} name={name} type={type} placeholder={placeholder} validate={validator} component={component} />
    </div>
}