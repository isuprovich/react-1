import s from './notification.module.css'

let Notification = ({errorMessage}) => {
    return <div className={s.Wrapper}>
        {errorMessage}
    </div>
}

export default Notification