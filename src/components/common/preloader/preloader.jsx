import s from './preloader.module.css'

let Preloader = (props) => {
    return <div className={s.rollerWrapper}>
        <div className={s.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div className={s.loadText}>Загрузка</div>
    </div>
}

export default Preloader