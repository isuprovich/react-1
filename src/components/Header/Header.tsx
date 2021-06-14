import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

type HeaderType = {
    isAuth: boolean,
    myId: number | null,
    myLogin: string | null
    logout: () => void
}

const Header: React.FC<HeaderType> = ({isAuth, myId, myLogin, logout}) => {
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
                                <NavLink to='/login' className={s.navlink} onClick={logout}>Выход</NavLink>
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