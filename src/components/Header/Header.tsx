import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/authReducer';
import { getIsAuth, getMyId, getMyLogin } from '../../redux/authSelectors';
import s from './Header.module.css';

const Header = () => {
    const isAuth = useSelector(getIsAuth)
    const myId = useSelector(getMyId)
    const myLogin = useSelector(getMyLogin)
    const dispatch = useDispatch()
    const logoutMe = () => (dispatch(logout()))
    return (
        <header className={s.header}>
            <div>
                {isAuth
                    ? <div>
                        <nav className={s.nav}>
                            <div className={s.item}>
                                <NavLink to='/dialogs' className={s.navlink} activeClassName={s.active}>Диалоги</NavLink>
                            </div>
                            <div className={s.item}>
                                <NavLink to='/users' className={s.navlink} activeClassName={s.active}>Поиск людей</NavLink>
                            </div>
                        </nav>
                        <div className={s.loginWrapper}>
                            <div className={s.item}>
                                <NavLink to={`/profile/${myId}`} className={s.navlink} activeClassName={s.active}>{myLogin}</NavLink>
                            </div>
                            <div className={s.item}>
                                <NavLink to='/login' className={s.navlink} onClick={logoutMe}>Выход</NavLink>
                            </div>
                        </div>
                    </div>
                    : <div className={s.loginWrapper}>
                        <div className={s.item}>
                            <NavLink to='/login' className={s.navlink} activeClassName={s.active}>Вход</NavLink>
                        </div>
                    </div>

                }
            </div>
        </header>
    );
}

export default Header;