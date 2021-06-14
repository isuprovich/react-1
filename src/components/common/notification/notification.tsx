import s from './notification.module.css'

type PropsType = {
    errorMessage: string
}

let Notification: React.FC<PropsType> = ({errorMessage}) => {
    return <div className={s.Wrapper}>
        {errorMessage}
    </div>
}

export default Notification