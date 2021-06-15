export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if(value) return undefined;
    return 'Обязательное поле';
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if(value.length > maxLength) return `Максимальная длина - ${maxLength} символов`;
    return undefined;
}